'use client';

import PageTitle from '@/components/common/PageTitle';
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AMQPWebSocketClient } from '@cloudamqp/amqp-client';
import Navbar from '@/components/Navbar';
import { RESERVATION_SERVICE_URL } from '@/services/constant';
import { getIsUserAdmin } from '@/services/user';
import { useRouter } from 'next/navigation';
import ReservationCard from '@/components/common/ReservationCard';
import NoData from '@/components/common/NoData';

export default function Home({
	params,
}: {
	params: { parking_space_id: string };
}) {
	const [reservations, setReservations] = useState<any[]>([]);
	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {
			const url = 'ws://localhost:15670/ws/amqp';
			const amqp = new AMQPWebSocketClient(url, '/', 'guest', 'guest');
			const conn = await amqp.connect();
			const ch = await conn.channel();
			await ch.queueDeclare(params.parking_space_id as string, {
				durable: false,
			});
			await ch.basicConsume(params.parking_space_id as string, {}, () => {
				getReservations();
			});
		};
		getIsUserAdmin().then((isAdmin) => {
			if (isAdmin) {
				fetchData();
				console.log(params.parking_space_id as string);
			} else {
				router.push('/');
			}
		});
	}, []);

	const getReservations = async () => {
		await axios
			.get(
				`${RESERVATION_SERVICE_URL}/getReservations/${
					params.parking_space_id as string
				}`
			)
			.then((response) => {
				setReservations(
					response.data.map((reservation: any) => {
						return {
							id: reservation.id,
							userId: reservation.userId,
							timeLeft: Math.floor(
								((reservation.lateAt - new Date().getTime()) / (1000 * 60)) % 60
							),
							lateAt: reservation.lateAt,
							confirmed: reservation.confirmed,
						};
					})
				);
			})
			.catch((error) => {
				console.error('Error fetching parking spaces:', error);
			});
	};

	const confirmReservation = async (id: string) => {
		await axios
			.post(`${RESERVATION_SERVICE_URL}/confirmReservation/${id}`)
			.then(getReservations)
			.catch((error) => {
				console.error('Error fetching parking spaces:', error);
			});
	};

	useEffect(() => {
		getReservations();
	}, []);

	return (
		<>
			<Navbar />
			<Stack className="gap-16 px-32 mt-16">
				<PageTitle title={NAVBAR_LABEL.RESERVATION} />
				{reservations.length > 0 ?
					reservations
						.filter(
							(reservation) => !reservation.confirmed && reservation.timeLeft > 0
						)
						.map((reservation, index) => (
							<ReservationCard
								key={index}
								reservation={{
									id: reservation.id,
									userId: reservation.userId,
									lateAt: reservation.lateAt,
								}}
								onClick={() => confirmReservation(reservation.id)}
							/>
						))
					:
					<div className='mt-[236px]'><NoData size='large' /></div>
				}
			</Stack>
		</>
	);
}
