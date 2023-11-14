'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { TextField, Button, Typography } from '@mui/material';

import {
	validateUsername,
	validateEmail,
	validateConfirmPassword,
	validatePassword,
} from '@/utilities/validation';
import { validation } from '@/types/Validation';
import PasswordTextField from '@/components/PasswordTextField';
import { USER_SERVICE_URL } from '@/services/constant';

export default function Home() {
	const router = useRouter();
	const [email, setEmail] = useState<string>('');
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [isSubmit, setIsSubmit] = useState<boolean>(false);

	const handlePasswordChange = (value: string) => {
		setPassword(value);
	};

	const handleConfirmPasswordChange = (value: string) => {
		setConfirmPassword(value);
	};

	const emailErr: validation = validateEmail(email);
	const usernameErr: validation = validateUsername(username);
	const passwordErr: validation = validatePassword(password);
	const confirmPasswordErr: validation = validateConfirmPassword(password, confirmPassword);

	const ready = !(emailErr.err || usernameErr.err || passwordErr.err || confirmPasswordErr.err);

	const handleRegister = async () => {
		setIsSubmit(true);

		if (!ready) {
			return;
		}

		try {
			const response = await axios.post(`${USER_SERVICE_URL}/register`, {
				email,
				username,
				password,
			});
			router.push('/login');
		} catch (error) {
			setError('Registration failed. Please try again later.');
		}

		setIsSubmit(false);
	};

	return (
		<>
			<Typography align="center" component="h1" variant="h5">
				Sign Up
			</Typography>
			<TextField
				label="Email"
				error={isSubmit && emailErr.err}
				helperText={isSubmit && emailErr.msg}
				placeholder="Email"
				variant="outlined"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
			/>
			<TextField
				label="Username"
				error={isSubmit && usernameErr.err}
				helperText={isSubmit && usernameErr.msg}
				placeholder="Username"
				variant="outlined"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<PasswordTextField
				label="Password"
				error={isSubmit && passwordErr.err}
				errorMsg={isSubmit ? passwordErr.msg : ''}
				placeholder="Password"
				value={password}
				onChange={handlePasswordChange}
			/>
			<PasswordTextField
				label="Confirm Password"
				error={isSubmit && confirmPasswordErr.err}
				errorMsg={isSubmit ? confirmPasswordErr.msg : ''}
				placeholder="Confirm Password"
				value={confirmPassword}
				onChange={handleConfirmPasswordChange}
			/>
			<Button
				variant="contained"
				onClick={handleRegister}
				fullWidth
				sx={{ mt: 3, mb: 2, backgroundColor: '#1565c0 !important' }}
			>
				SIGN UP
			</Button>
			{error && <Typography color="#f44336">{error}</Typography>}
		</>
	);
}
