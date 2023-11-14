'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { Typography, Stack, TextField, Button, Grid, Card } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import {
	validateUsername,
	validatePassword,
	validateConfirmPassword,
} from '@/utilities/validation';
import { validation } from '@/types/Validation';
import PasswordTextField from '@/components/PasswordTextField';
import { USER_SERVICE_URL } from '@/services/constant';

export default function Home() {
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [newUsername, setNewUsername] = useState<string>('');
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [isEdit, setIsEdit] = useState<boolean>(false);
	const [isSubmit, setIsSubmit] = useState<boolean>(false);

	const usernameErr: validation = validateUsername(newUsername);
	const passwordErr: validation = validatePassword(newPassword);
	const confirmPasswordErr: validation = validateConfirmPassword(newPassword, confirmPassword);

	const ready = !(usernameErr.err || passwordErr.err || confirmPasswordErr.err);

	const handleNewPasswordChange = (value: string) => {
		setNewPassword(value);
	};

	const handleConfirmPasswordChange = (value: string) => {
		setConfirmPassword(value);
	};

	const handleCancelEdit = () => {
		setIsEdit(false);
		setNewUsername('');
		setNewPassword('');
		setConfirmPassword('');
		setIsSubmit(false);
	};

	const handleSave = async () => {
		setIsSubmit(true);
		if (!ready) return;

		const API_URL = `${USER_SERVICE_URL}/editProfile`;

		const header = {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		};

		const data = {
			username: newUsername,
			password: newPassword,
		};

		const config = {
			method: 'PATCH',
			url: API_URL,
			headers: header,
			data: data,
		};

		axios(config)
			.then((response) => {
				setUsername(response.data.username);
				handleCancelEdit();
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};

	useEffect(() => {
		async function getProfile() {
			const API_URL = `${USER_SERVICE_URL}/getProfile`;

			const header = {
				Authorization: `Bearer ${localStorage.getItem('token')}`,
			};

			const config = {
				method: 'GET',
				url: API_URL,
				headers: header,
			};

			axios(config)
				.then((response) => {
					setUsername(response.data.username);
					setEmail(response.data.email);
				})
				.catch((error) => {
					console.error('Error:', error);
				});
		}
		getProfile();
	}, [username]);

	return (
		<>
			<Grid
				container
				component="main"
				sx={{
					height: '90%',
					backgroundImage: 'url(https://source.unsplash.com/1600x900/?parking)',
					backgroundRepeat: 'no-repeat',
					backgroundColor: 'rgba(255, 255, 255, 0.75)',
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					opacity: '0.5',
				}}
			/>
			<Card
				variant="outlined"
				sx={{
					minWidth: '275px',
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					paddingX: '5vw',
					paddingY: '10vh',
					position: 'absolute',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					zIndex: 1,
					borderRadius: 3,
				}}
			>
				<Stack spacing={2} alignItems="center">
					{!isEdit && (
						<>
							<Typography variant="h3" align="center">
								{username}
							</Typography>
							<Typography variant="h5" align="center">
								{email}
							</Typography>
							<Button onClick={() => setIsEdit(true)}>
								<EditIcon />
							</Button>
						</>
					)}
					{isEdit && (
						<>
							<Typography align="center" component="h1" variant="h5">
								Edit Profile
							</Typography>
							<TextField
								fullWidth
								label="Username"
								error={isSubmit && usernameErr.err}
								helperText={isSubmit && usernameErr.msg}
								placeholder="Username"
								variant="outlined"
								value={newUsername}
								onChange={(e) => setNewUsername(e.target.value)}
							/>
							<PasswordTextField
								label="Password"
								error={isSubmit && passwordErr.err}
								errorMsg={isSubmit ? passwordErr.msg : ''}
								placeholder="Password"
								value={newPassword}
								onChange={handleNewPasswordChange}
							/>
							<PasswordTextField
								label="Confirm Password"
								error={isSubmit && confirmPasswordErr.err}
								errorMsg={isSubmit ? confirmPasswordErr.msg : ''}
								placeholder="Confirm Password"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
							/>
							<div>
								<Button onClick={handleCancelEdit}>
									<ClearIcon color="error" />
								</Button>
								<Button onClick={handleSave}>
									<CheckIcon color="success" />
								</Button>
							</div>
						</>
					)}
				</Stack>
			</Card>
		</>
	);
}
