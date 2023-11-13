'use client';

import ButtonCV2X from '@/components/common/ButtonCV2X';
import PageTitle from '@/components/common/PageTitle';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { Card, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ModalCV2X from '@/components/common/ModalCV2X';
import ModalInputs from '@/components/module/ModalInputs';
import { InputFieldProp } from '@/types/common/input.model';
import Navbar from '@/components/Navbar';
import { PARKING_SERVICE_URL } from '@/services/constant';
import { useRouter } from 'next/navigation';

interface ParkingSpaceInput {
	id?: string;
	lat: string;
	lng: string;
	name: string;
	totalParking: string;
}

const ParkingSpaceTemplate: InputFieldProp<ParkingSpaceInput>[] = [
	{
		id: 'name',
		label: 'Name',
		type: 'TextField',
		placeholder: 'ex. ParkingSpace01',
		row: 1,
	},
	{
		id: 'totalParking',
		label: 'Total Parking Lots',
		type: 'TextField',
		placeholder: 'ex. 10',
		row: 1,
	},
	{
		id: 'lat',
		label: 'Latitude',
		type: 'TextField',
		placeholder: 'ex. 10',
		row: 2,
	},
	{
		id: 'lng',
		label: 'Longitude',
		type: 'TextField',
		placeholder: 'ex. 10',
		row: 2,
	},
];

export default function Home() {
	const [parkingSpaces, setParkingSpaces] = useState<any[]>([]);

	const [openRegisterModal, setOpenRegisterModal] = useState<boolean>(false);
	const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);

	const router = useRouter()

	const defaultData = ParkingSpaceTemplate.reduce(
		(acc, item) => ({
			...acc,
			[item.id]: '' as ParkingSpaceInput[keyof ParkingSpaceInput],
		}),
		{} as ParkingSpaceInput
	);

	// Modal data state
	const [registerModalData, setRegisterModalData] =
		useState<ParkingSpaceInput>(defaultData);
	const [updateModalData, setUpdateModalData] =
		useState<ParkingSpaceInput>(defaultData);

	const handleOpenRegisterModel = () => setOpenRegisterModal(true);
	const handleCloseRegisterModal = () => {
		setOpenRegisterModal(false);
		setRegisterModalData(defaultData);
	};
	const handleSubmitRegisterModal = () => {
		createParkingSpace(registerModalData);
		handleCloseRegisterModal();
	};

	const handleOpenUpdateModal = (id: string) => {
		getParkingSpace(id);
		setOpenUpdateModal(true);
	};
	const handleCloseUpdateModal = () => {
		setOpenUpdateModal(false);
		setUpdateModalData(defaultData);
	};
	const handleSubmitUpdateModal = () => {
		updateParkingSpace(updateModalData);
		handleCloseUpdateModal();
	};

	const routeToReservation = (parkingId: string) => {
		router.push(`/reservation/${parkingId}`)
	}

	const getParkingSpaces = async () => {
		await axios
			.get(`${PARKING_SERVICE_URL}/getParkingSpaces`)
			.then((response) => {
				setParkingSpaces(response.data);
			})
			.catch((error) => {
				console.error('Error fetching parking spaces:', error);
			});
	};

	const getParkingSpace = async (id: string) => {
		await axios
			.get(`${PARKING_SERVICE_URL}/getParkingSpace/${id}`)
			.then((response) => {
				setUpdateModalData(response.data);
			})
			.catch((error) => {
				console.error('Error fetching parking spaces:', error);
			});
	};

	const createParkingSpace = async (newParkingSpace: ParkingSpaceInput) => {
		await axios
			.post(`${PARKING_SERVICE_URL}/createParkingSpace`, newParkingSpace)
			.catch((error) => {
				console.error('Error deleting parking spaces:', error);
			});
		getParkingSpaces();
	};

	const updateParkingSpace = async (newParkingSpace: ParkingSpaceInput) => {
		await axios
			.patch(
				`${PARKING_SERVICE_URL}/updateParkingSpace/${newParkingSpace.id}`,
				newParkingSpace
			)
			.catch((error) => {
				console.error('Error deleting parking spaces:', error);
			});
		getParkingSpaces();
	};

	const deleteParkingSpace = async (id: string) => {
		await axios
			.delete(`${PARKING_SERVICE_URL}/deleteParkingSpace/${id}`)
			.catch((error) => {
				console.error('Error deleting parking spaces:', error);
			});
		getParkingSpaces();
	};

	useEffect(() => {
		getParkingSpaces();
	}, []);

	return (
		<>
			<Navbar />
			<ModalCV2X
				title="Add a parking space"
				variant={BUTTON_LABEL.REGISTER}
				open={openRegisterModal}
				handleOnClose={handleCloseRegisterModal}
				onSubmit={handleSubmitRegisterModal}
			>
				<ModalInputs
					template={ParkingSpaceTemplate}
					data={registerModalData}
					onDataChange={setRegisterModalData}
				/>
			</ModalCV2X>
			<ModalCV2X
				title="Update a parking space"
				variant={BUTTON_LABEL.UPDATE}
				open={openUpdateModal}
				handleOnClose={handleCloseUpdateModal}
				onSubmit={handleSubmitUpdateModal}
			>
				<ModalInputs
					template={ParkingSpaceTemplate}
					data={updateModalData}
					onDataChange={setUpdateModalData}
				/>
			</ModalCV2X>
			<Stack className="gap-16 px-32 mt-16">
				<PageTitle title={NAVBAR_LABEL.PARKING_SPACES} />
				<div className="w-72">
					<ButtonCV2X
						icon={BUTTON_LABEL.REGISTER}
						label={BUTTON_LABEL.REGISTER}
						onClick={handleOpenRegisterModel}
					/>
				</div>
				{parkingSpaces.map((parkingSpace, index) => (
					<Card key={index} className="w-full rounded-lg px-32 py-24">
						<Stack direction="row" className="gap-32 ontent-center">
							<Stack>
								<p>{`Parking space name : ${parkingSpace.name}`}</p>

								<p>{`Total parking lots : ${parkingSpace.totalParking}`}</p>
							</Stack>
							<Stack>
								<p>
									{`Parking space location : ( ${parkingSpace.lat} , ${parkingSpace.lng} )`}
								</p>
								<p>{`Available parking lots : ${parkingSpace.available}`}</p>
							</Stack>
							<div className="grow" />
							<ButtonCV2X
								icon={BUTTON_LABEL.SEARCH}
								label={"Reservation"}
								color="accept"
								onClick={() => routeToReservation(parkingSpace.id)}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.UPDATE}
								label={BUTTON_LABEL.UPDATE}
								color="primary"
								onClick={() => handleOpenUpdateModal(parkingSpace.id)}
							/>
							<ButtonCV2X
								icon={BUTTON_LABEL.DELETE}
								label={BUTTON_LABEL.DELETE}
								color="error"
								variant="outlined"
								onClick={() => deleteParkingSpace(parkingSpace.id)}
							/>
						</Stack>
					</Card>
				))}
			</Stack>
		</>
	);
}
