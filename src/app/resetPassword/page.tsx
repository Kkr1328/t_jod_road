'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { TextField, Button, Typography } from '@mui/material';

import {
	validateTextField,
	validateEmail,
	validateConfirmNewPassword,
} from '@/utilities/validation';
import { validation } from '@/types/Validation';
import AuthLayout from '@/components/AuthLayout';
import PasswordTextField from '@/components/PasswordTextField';

type errorInput = {
	email: boolean;
	newPassword: boolean;
	confirmNewPassword: boolean;
};
type errorInputMsg = {
	email: string;
	newPassword: string;
	confirmNewPassword: string;
};

export default function Home() {
	const router = useRouter();
	const [email, setEmail] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
	const [error, setError] = useState<errorInput>({
		email: false,
		newPassword: false,
		confirmNewPassword: false,
	});
	const [errorMsg, setErrorMsg] = useState<errorInputMsg>({
		email: '',
		newPassword: '',
		confirmNewPassword: '',
	});

	const handleNewPasswordChange = (value: string) => {
		setNewPassword(value);
	};

	const handleConfirmNewPasswordChange = (value: string) => {
		setConfirmNewPassword(value);
	};

	const handleResetPassword = async () => {
		const emailErr: validation = validateEmail(email);
		const newPasswordErr: validation = validateTextField(newPassword, 6);
		const confirmNewPasswordErr: validation = validateConfirmNewPassword(
			newPassword,
			confirmNewPassword
		);

		const ready = !(emailErr.err || newPasswordErr.err || confirmNewPasswordErr.err);

		setError({
			email: emailErr.err,
			newPassword: newPasswordErr.err,
			confirmNewPassword: confirmNewPasswordErr.err,
		});
		setErrorMsg({
			email: emailErr.msg,
			newPassword: newPasswordErr.msg,
			confirmNewPassword: confirmNewPasswordErr.msg,
		});

		if (!ready) return;

		const API_URL = 'http://localhost:4000/auth/reset_password';

		const data = {
			email: email,
			password: newPassword,
		};

		const config = {
			method: 'POST',
			url: API_URL,
			data: data,
		};

		axios(config)
			.then((response) => {
				router.push('/login');
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	return (
		<>
			<AuthLayout>
				<Typography align="center" component="h1" variant="h5">
					Reset Password
				</Typography>
				<TextField
					label="Email"
					error={error.email}
					helperText={errorMsg.email}
					placeholder="Email"
					variant="outlined"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<PasswordTextField
					label="New Password"
					error={error.newPassword}
					errorMsg={errorMsg.newPassword}
					placeholder="New Password"
					value={newPassword}
					onChange={handleNewPasswordChange}
				/>
				<PasswordTextField
					label="Confirm New Password"
					error={error.confirmNewPassword}
					errorMsg={errorMsg.confirmNewPassword}
					placeholder="Confirm New Password"
					value={confirmNewPassword}
					onChange={handleConfirmNewPasswordChange}
				/>
				<Button
					variant="contained"
					onClick={handleResetPassword}
					fullWidth
					sx={{ mt: 3, mb: 2, backgroundColor: '#1565c0 !important' }}
				>
					RESET PASSWORD
				</Button>
			</AuthLayout>
		</>
	);
}
