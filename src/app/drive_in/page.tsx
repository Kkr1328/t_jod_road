'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

import PageTitle from "@/components/common/PageTitle";
import { NAVBAR_LABEL } from "@/constants/LABEL";
import Card from '@mui/material/Card';
import { useState } from 'react';
import { Modal, Box } from '@mui/material';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import { MockedDriveIn, SpaceParking } from '@/mock/DRIVE_IN';

const center = {
    lat: 13.738329190226818,
    lng: 100.52718982270956
};

export default function DriveIN() {
    const [selectedPlace, setSelectedPlace] = useState<SpaceParking>()
    const [showModal, setModal] = useState<boolean>(false)

    const openModal = (place: SpaceParking) => {
        setSelectedPlace(place)
        setModal(true)
    }
    
    const reservePark = (id: string) => {

    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "<GOOGLE-MAP-KEY>",
    })

    if (!isLoaded) return 'Loading'
    return (
        <div className='h-[70dvh]'>
            <PageTitle title={NAVBAR_LABEL.CUSTOMERS_RESERVATION} />
            <Card className='flex w-full h-full my-32 rounded-lg px-32 py-24'>
                <GoogleMap
                    options={{ disableDefaultUI: true }}
                    zoom={16}
                    center={center}
                    mapContainerClassName='w-full'
                >
                    {MockedDriveIn.map((item) =>
                        <Marker
                            icon={{ url: '/parking_pin.svg', scaledSize: new google.maps.Size(64, 64) }}
                            position={item.position}
                            onClick={() => openModal(item)}
                        />
                    )}
                </GoogleMap>
            </Card>

            <Modal
                open={showModal}
                onClose={() => setModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className='flex flex-col gap-16 justify-center absolute top-1/2 left-1/2 w-[400px] translate-x-[-50%] translate-y-[-50%] border-solid bg-light_background_grey p-48 text-black rounded-lg'>
                    <h1 className='text-center'>{selectedPlace?.id}</h1>

                    <ButtonCV2X label='Reserve' onClick={() => {}} />
                    <ButtonCV2X label='Cancel' onClick={() => setModal(false)} color='secondary' />
                </Box>
            </Modal>
        </div>
    )
}
