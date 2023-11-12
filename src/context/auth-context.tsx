import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextProps {
	authState: {
		token: string;
	};
	setAuthState: (userAuthInfo: { data: { data: string } }) => void;
	logout: () => void;
	isUserAuthenticated: () => boolean;
}

const AuthContext = createContext<AuthContextProps>({
	authState: { token: '' },
	setAuthState: () => {},
	logout: () => {},
	isUserAuthenticated: () => false,
});

const { Provider } = AuthContext;

interface AuthProviderProps {
	children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [authState, setAuthState] = useState({
		token: localStorage.getItem('token') || '',
	});

	const setUserAuthInfo = ({ data }: { data: { data: string } }) => {
		const tokenData = data.data;
		localStorage.setItem('token', tokenData);

		setAuthState({
			token: tokenData,
		});
	};

	const logout = () => {
		localStorage.removeItem('token');
		setAuthState({
			token: '',
		});
	};

	const isUserAuthenticated = () => {
		return !!authState.token;
	};

	return (
		<Provider
			value={{
				authState,
				setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
				logout,
				isUserAuthenticated,
			}}
		>
			{children}
		</Provider>
	);
};

export { AuthContext, AuthProvider };
