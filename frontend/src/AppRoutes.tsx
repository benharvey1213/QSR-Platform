import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AuthContext } from "./contexts/AuthContext";
import Login from "./components/Login";
import App from "./App";

export default function AppRoutes() {
	const { token } = useContext(AuthContext);

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />}/>
				<Route path="/*" element={token ? <App /> : <Navigate to="/login" replace />}/>
			</Routes>
		</BrowserRouter>
	);
}
