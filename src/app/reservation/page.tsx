'use client';

import Navbar from '@/components/Navbar';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { MockedReservation } from '@/mock/RESERVATION';
import { Card, Stack } from '@mui/material';

export default function Home() {
	return (
		<>
			<Navbar />
			<Stack className="gap-16 px-32 mt-16">
				<PageTitle title={NAVBAR_LABEL.RESERVATION} />
				{MockedReservation.map((reservation) => (
					<Card className="w-full rounded-lg px-32 py-24">
						<Stack direction="row" className="gap-16">
							<Stack>
								<p>{`${reservation.first_name} ${reservation.last_name}`}</p>
								<p>{reservation.time_left}</p>
							</Stack>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.APPROVE}
								label={BUTTON_LABEL.APPROVE}
								color="accept"
								onClick={() => console.log('hih')}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.CANCEL}
								label={BUTTON_LABEL.CANCEL}
								color="error"
								variant="outlined"
								onClick={() => console.log('yoy')}
							/>
						</Stack>
					</Card>
				))}
			</Stack>
		</>
	);
}
