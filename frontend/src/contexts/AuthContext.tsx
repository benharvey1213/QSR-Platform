import React, { createContext, ReactNode, useEffect, useState } from "react";
import { verifyToken } from "../service/AuthService";

interface AuthContextType {
    token: string | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthContext = createContext<AuthContextType>({
	token: null,
	setToken: () => {}
});

export default function AuthManager({ children } : { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const localToken = localStorage.getItem('token');

		if (localToken) {
			console.log("trying to veryify token", localToken);
			verifyToken(localToken).then((user) => {
				console.log('verified token', user);
				setToken(localToken);
			}).catch(err => {
				console.error('Error verifying token:', err);
				localStorage.removeItem('token');
			})
		}
	}, [])

	return <AuthContext.Provider value={{ token, setToken }}>
		{children}
	</AuthContext.Provider>
}