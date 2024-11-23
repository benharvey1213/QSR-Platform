import React, { createContext, ReactNode, useEffect, useState } from "react";

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
			console.log("Setting token from local storage", localToken);
			setToken(localToken);
		}
	}, [])

	return <AuthContext.Provider value={{ token, setToken }}>
		{children}
	</AuthContext.Provider>
}