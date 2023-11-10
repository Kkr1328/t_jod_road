import { useState } from 'react';

import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

interface passwordProps {
	error: boolean;
	errorMsg?: string;
	placeholder: string;
	onChange: (value: string) => void;
	value: string;
	label?: string;
}

export default function PasswordTextField(props: passwordProps) {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		props.onChange(event.target.value);
	};

	return (
		<>
			<TextField
				label={props.label}
				error={props.error}
				helperText={props.errorMsg}
				placeholder={props.placeholder}
				variant="outlined"
				fullWidth
				type={showPassword ? 'text' : 'password'}
				value={props.value}
				onChange={handleChange}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
								{showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
		</>
	);
}
