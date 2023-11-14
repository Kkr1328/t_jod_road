'use client';

import PageTitle from '@/components/common/PageTitle';
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { Card, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import React from 'react';
import axios from 'axios';

export default function Home({params,}: {
	params: { parking_space_id: string };
}) {

    const [message, setMessage] = useState<string>('');
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
  
    const handleSubmit = async () => {
      setIsSubmit(true);
  
      if (message === '') {
        return;
      }
  
      try {
        const response = await axios.post(`http://localhost:6000/createReview/${params.parking_space_id as string}`, {
          message,
        });
      } catch (error) {
        console.error('Submit failed:', error);
      }
  
      setIsSubmit(false);
    };

    return (
        <Stack className='gap-16'>
            <PageTitle title= {"Write "+NAVBAR_LABEL.REVIEW}/>
            <Card className='w-full rounded-lg border-2'>
              <Stack  className='gap-16 p-8'>
                <p>{"Parking lot's name"}</p>
                <p>{"Username"}</p>
                <TextField
					        error={isSubmit && message === ''}
					        placeholder="Write your review here..."
					        variant="outlined"
					        value={message}
					        onChange={(e) => setMessage(e.target.value)}
				        />
              </Stack> 
            </Card>
            
            <Stack direction="row" className="gap-16 flex justify-center">
              <ButtonCV2X
                label='Submit'
                color="accept"
                onClick={handleSubmit}
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