'use client';

import PageTitle from '@/components/common/PageTitle';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { MockedReview } from '@/mock/REVIEW';
import { Card, Stack } from '@mui/material';

export default function Home(){
    return (
        <Stack className='gap-16'>
            <PageTitle title= {"Parking name's "+NAVBAR_LABEL.REVIEW}/>
                {MockedReview.map((review) =>(
                <div className="flex justify-center">
                <Card className='w-1/2 rounded-md border-2'>
                    <Stack  className='gap-16 p-8'>
                        <p className='font-bold'>{review.user_id}</p>
                        <p className=''>{review.review}</p>
                    </Stack> 
                </Card>
                </div>
            ))}
        </Stack>
    )
}