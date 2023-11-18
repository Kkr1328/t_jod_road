'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'
import { useTimer } from 'react-timer-hook';
import { useEffect, useState } from 'react';

import PageTitle from "@/components/common/PageTitle";
import { NAVBAR_LABEL } from "@/constants/LABEL";

import Card from '@mui/material/Card';
import { Modal, Box } from '@mui/material';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import PenaltyBadge from '@/components/common/PenaltyBadge';

import { PenaltyStatus, SpaceParking } from '@/mock/DRIVE_IN';

import { getParkingSpaceByID } from '@/services/parking-lot';
import { getIsUserAdmin, getPenaltyStatus, getProfile } from '@/services/user';
import { createReservation, getActiveReservationsByUser } from '@/services/matching';

import { GetAvailableSpacesServiceClient } from '@/proto/Parking-spaceServiceClientPb'
// @ts-ignore
import { ParkingSpaceList } from '@/proto/parking-space_pb'
import router from 'next/router';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { AMQPWebSocketClient } from '@cloudamqp/amqp-client';

const center = {
    lat: 13.738329190226818,
    lng: 100.52718982270956
};

export default function DriveIN() {
    const [parkingMap, setParkingMap] = useState<SpaceParking[]>()
    const [selectedPlace, setSelectedPlace] = useState<SpaceParking>()
    const [penaltyStatus, setPenaltyStatus] = useState<PenaltyStatus | null>(null)
    const [showReserveModal, setShowReserveModal] = useState<boolean>(false)
    const [resultStatus, setResultStatus] = useState<[String, String]>(["",""])
    const [showResultModal, setShowResultModal] = useState<boolean>(false)
    const [recommendReviewModal, setRecommendReviewModal] = useState<boolean>(false)
    const [recommendReviewLoc, setRecommendReviewLoc] = useState()
    const nav_router = useRouter()

    const expiryTimestamp = new Date()

    const {
        seconds,
        minutes,
        isRunning,
        restart,
        pause
      } = useTimer({ expiryTimestamp, autoStart: false, onExpire: () => console.log(`time out`) });

    function getAvailableSpaces() {
        const strRq = new ParkingSpaceList();
        const client = new GetAvailableSpacesServiceClient('http://localhost:8080/', null, null)
        const stream = client.getAvailableSpaces(strRq, {})

        stream.on('data', (res: any) => {
            const data: SpaceParking[] = gRPCMapping(res.array)
            setParkingMap(data)
        })

        router.events.on('routeChangeStart', (url, { shallow }) => {
            stream.cancel()
        });
    }

    function fetchRecommendReview() {
        const fetchData = async () => {
			const url = 'ws://localhost:15670/ws/amqp';
			const amqp = new AMQPWebSocketClient(url, '/', 'guest', 'guest');
			const conn = await amqp.connect();
			const ch = await conn.channel();
            const userInfo = await getProfile()
			await ch.queueDeclare(userInfo.id, {
				durable: false,
			});
			await ch.basicConsume(userInfo.id, {}, (e) => {
                const body = e.bodyToString()
                console.log(body)
                if (body === null) { return }
                const parkingLotId = JSON.parse(body).parkingLotId
                console.log('oark' + parkingLotId)
                setRecommendReviewLoc(parkingLotId)
                pause()
                setRecommendReviewModal(true)
			});
		};
		fetchData();
		console.log("params.parking_space_id");
    }

    useEffect(() => {
        const fetchData = async () => {
            const isAdmin = await getIsUserAdmin()
            if(isAdmin) { nav_router.push('/parking_space') }
            getPenaltyStatus((data) => setPenaltyStatus(data))
            fetchRecommendReview()

            getAvailableSpaces()

            const activate = getActiveReservationsByUser()
            activate
                .then(e => e.data)
                .then(e => {
                    if(e.length > 0) {
                        const d = new Date(e[e.length - 1].lateAt)
                        restart(d)
                    }
                })
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (showReserveModal) {
            if(selectedPlace === undefined) return
            getParkingSpaceByID(selectedPlace.id, setSelectedPlace)
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
                    setResultStatus(["Reserve Complete",`Please check-in within 30min`])
                    const time = new Date();
                    time.setSeconds(time.getSeconds() + 1800); // 30 minutes timer
                    restart(time)
                } else {
                    throw Error
                }
            })
            .catch((e) => {
                setResultStatus([`Fail to reserve`, e])
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
        <>
            <Navbar />
            <div className='h-[80dvh] flex flex-col gap-12 text-black px-32 mt-16'>
                <PageTitle title={NAVBAR_LABEL.CUSTOMERS_RESERVATION} />
                { isRunning ?
                    <div className='text-center text-h2 text-active_green'>{minutes}m {seconds}s left</div> :
                    <PenaltyBadge props={penaltyStatus} />
                }
                <Card className='flex w-full h-full rounded-lg px-32 py-24'>
                    <GoogleMap
                        options={{ disableDefaultUI: true }}
                        zoom={16}
                        center={center}
                        mapContainerClassName='w-full'
                    >
                        {parkingMap?.map((item) =>
                            <Marker
                                icon={{ url: '/parking_pin.svg', scaledSize: new google.maps.Size(64, 64) }}
                                label={{ text: item.available !== null ? item.available.toString() : "fail", color: 'white', fontWeight: 'bold', className: 'translate-y-[-5px]' }}
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
                                    <ButtonCV2X label='View Review' onClick={() => nav_router.push(`/view_review/${selectedPlace.id}`)} />
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
                        <h1 className='text-center font-bold'>{resultStatus[0]}</h1>
                        <div className=''>{resultStatus[1]}</div>
                        <ButtonCV2X label='Close' onClick={() => setShowResultModal(false)} />
                    </Box>
                </Modal>
                <Modal
                    open={recommendReviewModal} // recommendReviewModal
                    onClose={() => setShowResultModal(false)}
                >
                    <Box className='flex flex-col gap-16 justify-center absolute top-1/2 left-1/2 w-[400px] translate-x-[-50%] translate-y-[-50%] border-solid bg-light_background_grey p-48 text-black rounded-lg'>
                        <h1 className='text-center font-bold'>Thanks for using our services</h1>
                        <span>Do you want to review parking?</span>
                        <ButtonCV2X label='Of course!' onClick={() => { 
                                setRecommendReviewModal(false)
                                nav_router.push(`/write_review/${recommendReviewLoc}`)
                            }}
                        />
                        <ButtonCV2X label='No' onClick={() => setRecommendReviewModal(false)} color='secondary' />
                    </Box>
                </Modal>
            </div>
        </>
       
    )
}

function gRPCMapping(data: any): SpaceParking[] {
    const arr = data[0]
    let final:SpaceParking[] = []
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        const [ id, name, lat, lng, available ] = element
        final.push({ id, name, lat, lng, available })
    }
    return final
}