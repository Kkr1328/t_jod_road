'use client';

import PageTitle from '@/components/common/PageTitle';
import { BUTTON_LABEL, NAVBAR_LABEL } from '@/constants/LABEL';
import { Card, Stack } from '@mui/material';
import { useState } from 'react';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import React from 'react';

export default function Home(){

    const [review, setReview] = useState('');
  
    const handleSubmit = (event: { preventDefault: () => void; }) => {
      event.preventDefault();
  
      // Save the review to the database
    };

    return (
        <Stack className='gap-16'>
            <PageTitle title= {"Write "+NAVBAR_LABEL.REVIEW}/>
            <Card className='w-full rounded-lg border-2'>
              <Stack  className='gap-16 p-8'>
                <p>{"Parking lot's name"}</p>
                <p>{"Username"}</p>
                <input
                  type="text"
                  placeholder={"Write your review here..."}
                  onChange={e => setReview(e.target.value)}
                  className = {"border rounded-md py-2 px-4"}
                />
              </Stack> 
            </Card>
            
            <Stack direction="row" className="gap-16 flex justify-center">
              <ButtonCV2X
                label='Submit'
                color="accept"
              />
              <ButtonCV2X 
                label='Cancel'
                color="error"
                variant="outlined"
              />
            </Stack>
            
        </Stack>
    )
}