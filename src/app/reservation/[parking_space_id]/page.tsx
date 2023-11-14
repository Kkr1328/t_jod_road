'use client';

import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { Card, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AMQPWebSocketClient } from '@cloudamqp/amqp-client';
import ReservationCard from '@/components/common/ReservationCard';

export default function Home({
	params,
}: {
	params: { parking_space_id: string };
}) {
	const [reservations, setReservations] = useState<any[]>([]);

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
		fetchData();
		console.log(params.parking_space_id as string);
	}, []);

	const getReservations = async () => {
		await axios
			.get(
				`http://localhost:9000/getReservations/${
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
			.post(`http://localhost:9000/confirmReservation/${id}`)
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
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.RESERVATION} />
				{reservations
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
					))}
			</Stack>
		</>
	);
}
