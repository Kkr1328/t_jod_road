'use client'

import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api'

import PageTitle from "@/components/common/PageTitle";
import { NAVBAR_LABEL } from "@/constants/LABEL";
import Card from '@mui/material/Card';

const center = {
    lat: 13.738329190226818,
    lng: 100.52718982270956
};

export default function DriveIN() {
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
                    <Marker
                        position={center}
                    />
                </GoogleMap>
            </Card>
        </div>
    )
}
