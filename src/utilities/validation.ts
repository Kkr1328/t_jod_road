import { validation } from '@/types/Validation';

const regexEmail: RegExp =
	/^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export function validateEmail(email: string): validation {
	if (email.trim().length === 0) {
		return { msg: 'This field cannot be blank.', err: true };
	}
	if (!regexEmail.test(email)) {
		return { msg: 'Email format is invalid.', err: true };
	}
	return { msg: '', err: false };
}

export function validateUsername(username: string): validation {
	if (username.trim().length === 0) {
		return { msg: 'This field cannot be blank.', err: true };
	}
	if (username.trim().length > 15) {
		return { msg: 'Username cannot exceed 15 characters', err: true };
	}
	return { msg: '', err: false };
}

export function validatePassword(password: string): validation {
	// check contain space (starting, between, ending)
	if (password.includes(' ')) {
		return { msg: 'Password cannot contain space.', err: true };
	}
	// check empty & check min char
	if (password.length < 6) {
		return {
			msg: `Password must contain at least 6 characters.`,
			err: true,
		};
	}

	return { msg: '', err: false };
}

export function validateTextField(
	input: string,
	minChar: number = 0,
	maxChar: number = 2000
): validation {
	if (input.length < minChar) {
		if (minChar == 1) {
			return { msg: 'This field cannot be blank.', err: true };
		} else {
			return {
				msg: `This field must contain at least ${minChar} characters.`,
				err: true,
			};
		}
	}
	if (input.length > maxChar) {
		return { msg: `This field cannot exceed ${maxChar} characters.`, err: true };
	}
	return { msg: '', err: false };
}

export function validateConfirmPassword(password: string, confirmPassword: string): validation {
	const passwordErr: validation = validatePassword(password);

	if (passwordErr.err) {
		return passwordErr;
	}
	if (password !== confirmPassword) {
		return {
			msg: 'Password and Confirm Password must be match.',
			err: true,
		};
	}
	return { msg: '', err: false };
}

export function validateConfirmNewPassword(
	newPassword: string,
	confirmNewPassword: string
): validation {
	const newPasswordErr: validation = validatePassword(newPassword);

	if (newPasswordErr.err) {
		return newPasswordErr;
	}
	if (newPassword !== confirmNewPassword) {
		return {
			msg: 'New Password and Confirm New Password must be match.',
			err: true,
		};
	}
	return { msg: '', err: false };
}
