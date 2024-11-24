import React, { createContext, ReactNode, useEffect, useState } from "react";
import { verifyToken } from "../service/AuthService";
import { Role } from "../service/BackendInterfaceService";

interface AuthContextType {
    token: string | null;
	role: Role | null;
    setToken: React.Dispatch<React.SetStateAction<string | null>>;
	setRole: React.Dispatch<React.SetStateAction<Role | null>>;
}

export const AuthContext = createContext<AuthContextType>({
	token: null,
	role: null,
	setToken: () => {},
	setRole: () => {},
});

export default function AuthManager({ children } : { children: ReactNode }) {
	const [token, setToken] = useState<string | null>(null);
	const [role, setRole] = useState<Role | null>(null);

	useEffect(() => {
		const localToken = localStorage.getItem('token');

		if (localToken) {
			console.log("Attempting to veryify token", localToken);

			verifyToken(localToken).then((user) => {
				console.log('Succesfully verified token', user);

				setToken(localToken);
				setRole(user.role);
			}).catch(err => {
				console.error('Error verifying token:', err);
				localStorage.removeItem('token');
			})
		}
	}, [])

	return <AuthContext.Provider value={{ token, setToken, role, setRole }}>
		{children}
	</AuthContext.Provider>
}