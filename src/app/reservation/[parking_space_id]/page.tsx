'use client';

import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { Card, Stack } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { AMQPWebSocketClient } from '@cloudamqp/amqp-client';
import Navbar from '@/components/Navbar';
import { RESERVATION_SERVICE_URL } from '@/services/constant';

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
				{reservations
					.filter(
						(reservation) => !reservation.confirmed && reservation.timeLeft > 0
					)
					.map((reservation, index) => (
						<Card key={index} className="w-full rounded-lg px-32 py-24">
							<Stack direction="row" className="gap-16">
								<Stack>
									<p>{`Reservation Id : ${reservation.id}`}</p>
									<p>{`Reserved by userId : ${reservation.userId}`}</p>
									<p>{`Time left : ${reservation.timeLeft} minutes`}</p>
								</Stack>
								<div className="grow" />
								<ButtonCV2X
									icon={BUTTON_LABEL.APPROVE}
									label={BUTTON_LABEL.APPROVE}
									color="accept"
									onClick={() => confirmReservation(reservation.id)}
								/>
							</Stack>
						</Card>
					))}
			</Stack>
		</>
	);
}
