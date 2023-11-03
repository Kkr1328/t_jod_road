'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from 'react';

import PageTitle from "@/components/common/PageTitle";
import { NAVBAR_LABEL } from "@/constants/LABEL";

import Card from '@mui/material/Card';
import { Modal, Box } from '@mui/material';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import { MockedDriveIn, SpaceParking, PenaltyStatus } from '@/mock/DRIVE_IN';
import { getParkingSpaceByID } from '@/services/parking-lot';
import { getPenaltyStatus } from '@/services/user';
import { createReservation } from '@/services/matching';

const center = {
    lat: 13.738329190226818,
    lng: 100.52718982270956
};

export default function DriveIN() {
    const [selectedPlace, setSelectedPlace] = useState<SpaceParking>()
    const [penaltyStatus, setPenaltyStatus] = useState<boolean>()
    const [showReserveModal, setShowReserveModal] = useState<boolean>(false)
    const [resultStatus, setResultStatus] = useState<string>()
    const [showResultModal, setShowResultModal] = useState<boolean>(false)

    const expiryTimestamp = new Date()

    const {
        seconds,
        minutes,
        isRunning,
        restart,
      } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.log(`time out`) });

    useEffect(() => {
        getPenaltyStatus((data) => setPenaltyStatus(data))
    }, [])

    useEffect(() => {
        if (showReserveModal) {
            // @here selectedPlace.id instead hardcode
            if(selectedPlace === undefined) return
            getParkingSpaceByID('6544f991d38dea00faa140f3', setSelectedPlace)
        }
    }, [showReserveModal]);

    const openModal = (place: SpaceParking) => {
        setSelectedPlace(place)
        setShowReserveModal(true)
    }

    const reservePark = (id: string) => {
        createReservation(id)
            .then(e => {
                if (e.success) {
                    setResultStatus(`reserve complete: please checkin within 30min`)
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + 1800); // 30 minutes timer
                    restart(time)
                } else {
                    throw Error
                }
            })
            .catch(() => {
                setResultStatus(`fail to reserve`)
            })
            .finally(() => {
                setShowReserveModal(false)
                setShowResultModal(true)
            })
    }

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "<GOOGLE-MAP-KEY>",
    })

    if (!isLoaded) return 'Loading'
    return (
        <div className='h-[80dvh] flex flex-col gap-12 text-black'>
            <PageTitle title={NAVBAR_LABEL.CUSTOMERS_RESERVATION} />
            { isRunning ?
                <div className='text-center text-h2 text-active_green'>{minutes}m {seconds}s left</div> :
                <span>{penaltyStatus ? 'You are banned' : 'Normal status'}</span>
                // <Penalty props={penaltyStatus} />
            }
            <Card className='flex w-full h-full rounded-lg px-32 py-24'>
                <GoogleMap
                    options={{ disableDefaultUI: true }}
                    zoom={16}
                    center={center}
                    mapContainerClassName='w-full'
                >
                    {MockedDriveIn.map((item) =>
                        <Marker
                            icon={{ url: '/parking_pin.svg', scaledSize: new google.maps.Size(64, 64) }}
                            label={{ text: item.available.toString(), color: 'white', fontWeight: 'bold', className: 'translate-y-[-5px]' }}
                            position={new google.maps.LatLng(item.lat, item.lng)}
                            onClick={() => openModal(item)}
                            key={item.id}
                        />
                    )}
                </GoogleMap>
            </Card>

            {selectedPlace &&
                <Modal
                    open={showReserveModal}
                    onClose={() => setShowReserveModal(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box className='flex flex-col gap-16 justify-center absolute top-1/2 left-1/2 w-[400px] translate-x-[-50%] translate-y-[-50%] border-solid bg-light_background_grey p-48 text-black rounded-lg'>
                        { !isRunning ?
                            <>
                                <h1 className='text-center'>Confirm with <span className='font-bold'>{selectedPlace.name}</span>?</h1>
                                <ButtonCV2X label='Reserve' onClick={() => reservePark(selectedPlace.id)} />
                                <ButtonCV2X label='Close' onClick={() => setShowReserveModal(false)} color='secondary' />
                            </> :
                            <h1 className='text-center'>Location: <span className='font-bold'>{selectedPlace.name}</span></h1>
                        }
                    </Box>
                </Modal>
            }

            <Modal
                open={showResultModal}
                onClose={() => setShowResultModal(false)}
            >
                <Box className='flex flex-col gap-16 justify-center absolute top-1/2 left-1/2 w-[400px] translate-x-[-50%] translate-y-[-50%] border-solid bg-light_background_grey p-48 text-black rounded-lg'>
                    <h1 className='text-center'>Result</h1>
                    <div>{resultStatus}</div>
                    <ButtonCV2X label='Close' onClick={() => setShowResultModal(false)} />
                </Box>
            </Modal>
        </div>
    )
}

type Props = {
    props: PenaltyStatus | undefined
}

function Penalty({ props }: Props) {
    if (!props) return <>Loading Penalty...</>
    if (props.status === 'NORMAL') {
        if (props.leftQuota >= 5) {
            return <span>You are TCP (Reliable)</span>
        } else {
            return <span>Left quota before get penalty: {props.leftQuota}</span>
        }
    } else {
        return <span>Before <span className='font-bold'>{props.unBannedDate}</span>, you must deposit to use system</span>
    }
}