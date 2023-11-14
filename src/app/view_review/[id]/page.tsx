'use client';

import PageTitle from '@/components/common/PageTitle';
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { Card, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function Home({params,}: {
	params: { parking_space_id: string };
}) {

    const [reviews, setReviews] = useState<any[]>([]);

    const getReviews = async () => {
        await axios
        .get(
            `http://localhost:6000/getReviewsByParkingLot/${params.parking_space_id as string}`
        )
        .then((response) => {
            setReviews(
                response.data.map((review: any) => {
                    return {
                        id: review.id,
                        reservationId: review.reservationId,
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

    useEffect(() => {
		getReviews();
	}, []);

    return (
        <Stack className='gap-16'>
            <PageTitle title= {"Parking name's "+NAVBAR_LABEL.REVIEW}/>
                {reviews.map((review, index) =>(
                <div className="flex justify-center">
                <Card key={index} className='w-1/2 rounded-md border-2'>
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