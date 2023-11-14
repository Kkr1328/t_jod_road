'use client';
import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { TextField, Button, Typography, Link, Grid } from '@mui/material';

import { AuthContext } from '@/context/auth-context';
import PasswordTextField from '@/components/PasswordTextField';
import { USER_SERVICE_URL } from '@/services/constant';

export default function Home() {
	const router = useRouter();
	const authContext = useContext(AuthContext);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

	const handlePasswordChange = (value: string) => {
		setPassword(value);
	};

	const ready = !(username.trim().length === 0 || password.trim().length === 0);
	const { setAuthState } = authContext;

	const handleLogin = async () => {
		if (!ready) {
			setError('username and password cannot be blank');
			return;
		}

		try {
			const response = await axios.post(`${USER_SERVICE_URL}/login`, { username, password });
			const token = response.data.access_token;
			const userAuthInfo = {
				data: {
					data: token,
				},
			};
			setAuthState(userAuthInfo);
			router.push('/drive_in');
		} catch (error) {
			console.log(error);
			setError('Wrong username or password. Please try again.');
		}
	};

	return (
		<>
			<Typography align="center" component="h1" variant="h5">
				Login
			</Typography>
			<TextField
				label="Username"
				error={error !== ''}
				placeholder="Username"
				variant="outlined"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<PasswordTextField
				label="Password"
				error={error !== ''}
				placeholder="Password"
				value={password}
				onChange={handlePasswordChange}
			/>
			<Button
				variant="contained"
				onClick={handleLogin}
				fullWidth
				sx={{ mt: 3, mb: 2, backgroundColor: '#1565c0 !important' }}
			>
				LOGIN
			</Button>
			<Grid container>
				<Grid item xs>
					<Link href="/resetPassword" variant="body2">
						Forgot Password?
					</Link>
				</Grid>
				<Grid item>
					<Link href="/register" variant="body2">
						New Here? Sign Up
					</Link>
				</Grid>
			</Grid>
			{error && (
				<Typography color="#f44336" variant="body2">
					{error}
				</Typography>
			)}
		</>
	);
}
