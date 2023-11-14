'use client';

import PageTitle from '@/components/common/PageTitle';
import { NAVBAR_LABEL } from '@/constants/LABEL';
import { Card, Stack, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import ButtonCV2X from '@/components/common/ButtonCV2X';
import React from 'react';
import axios from 'axios';
import { AuthContext } from '@/context/auth-context';

export default function Home({params,}: {
	params: { id: string };
}) {

    const [message, setMessage] = useState<string>('');
    const [isSubmit, setIsSubmit] = useState<boolean>(false);
    const [parkingSpaceName, setParkingSpceName] = useState<string>('');
    const authContext = useContext(AuthContext);
    console.log(authContext.authState.token)
    const handleSubmit = async () => {
      setIsSubmit(true);
  
      if (message === '') {
        return;
      }
  
      try {
        const response = await axios.post(`http://localhost:6000/createReview/${params.id as string}`, {

          message,
        },{headers:{
          Authorization:authContext.authState.token
        }});
      } catch (error) {
        console.error('Submit failed:', error);
      }
  
      setIsSubmit(false);
    };

    useEffect(() => {
      const getParkingSpaceName = async () => {
        await axios
        .get(
            `http://localhost:4000/getParkingSpace/${params.id as string}`
        )
        .then((response) => {
          setParkingSpceName(response.data["name"])
        })
        .catch((error) => {
            console.error('Error fetching parkingSpaceName:', error);
        });
      }
      getParkingSpaceName();
    }, []);

    return (
        <Stack className='gap-16'>
            <PageTitle title= {"Write "+NAVBAR_LABEL.REVIEW}/>
            <Card className='w-full rounded-lg border-2'>
              <Stack  className='gap-16 p-8'>
                <p>{parkingSpaceName}</p>
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