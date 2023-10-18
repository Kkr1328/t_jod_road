'use client';

import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { MockedParkingSpace } from '@/mock/PARKING_SPACE';
import { Card, Stack } from '@mui/material';

export default function Home() {
	return (
		<>
			<Stack className="gap-16">
				<PageTitle title={NAVBAR_LABEL.PARKING_SPACES} />
				<div className="w-72">
					<ButtonCV2X
						icon={BUTTON_LABEL.REGISTER}
						label={BUTTON_LABEL.REGISTER}
					/>
				</div>
				{MockedParkingSpace.map((parkingSpace) => (
					<Card className="w-full rounded-lg px-32 py-24">
						<Stack direction="row" className="gap-16">
							<Stack>
								<p>{parkingSpace.name}</p>
								<p>{parkingSpace.location}</p>
							</Stack>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.UPDATE}
								label={BUTTON_LABEL.UPDATE}
								color="primary"
								onClick={() => console.log('hih')}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.DELETE}
								label={BUTTON_LABEL.DELETE}
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
