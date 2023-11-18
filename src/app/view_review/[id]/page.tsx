'use client';

import PageTitle from '@/components/common/PageTitle';
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { Card, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PARKING_SERVICE_URL, REVIEW_SERVICE_URL } from '@/services/constant';



export default function Home({params,}: {
	params: { id: string };
}) {

    const [reviews, setReviews] = useState<any[]>([]);
    const [parkingSpaceName, setParkingSpaceName] = useState<string>('');

    const getReviews = async () => {
        await axios
        .get(
            `http://localhost:9001/getReviewsByParkingLot/${params.id as string}`
        )
        .then((response) => {
            setReviews(
                response.data.map((review: any) => {
                    return {
                        id: review.id,
                        userId: review.userId,
                        username: review.username,
                        message: review.message,                      
                    };
                })
            );
        })
        .catch((error) => {
            console.error('Error fetching reviews:', error);
        });
    }

    const getParkingSpaceName = async () => {
        await axios
        .get(
            `${PARKING_SERVICE_URL}/getParkingSpace/${params.id as string}`
        )
        .then((response) => {
            setParkingSpaceName(response.data["name"])
        })
        .catch((error) => {
            console.error('Error fetching parkingSpaceName:', error);
        });
    }

    useEffect(() => {
        getParkingSpaceName();
		getReviews();
	}, []);

    return (
        <Stack className='gap-16'>
            <PageTitle title= {parkingSpaceName+"'s "+NAVBAR_LABEL.REVIEW}/>
                {reviews.map((review, index) =>(
                <div key={index} className="flex justify-center">
                <Card className='w-1/2 rounded-md border-2'>
                    <Stack  className='gap-16 p-8'>
                        <p className='font-bold'>{review.username}</p>
                        <p>{review.message}</p>
                    </Stack> 
                </Card>
                </div>
            ))}
        </Stack>
    )
}