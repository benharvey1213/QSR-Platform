import { BrowserRouter, Route, Routes, Navigate } from "react-router";

import ProtectedRoute from "./routing/ProtectedRoute";
import MenuItem from "./components/MenuItem";
import Login from "./components/Login";
import App from "./App";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

export default function AppRoutes() {
	const { token } = useContext(AuthContext);

	return <BrowserRouter>
		<Routes>
			<Route path="/login" element={token ? <Navigate to="/" replace/> : <Login/>}/>

			<Route element={<ProtectedRoute redirectTo="/login"/>}>
				<Route path="/" element={<App />} />
				<Route path="/menu-item/new" element={<MenuItem newItem/>} />
				<Route path="/menu-item/:id" element={<MenuItem />} />
				<Route path="*" element={<Navigate to="/" replace/>} />
			</Route>
		</Routes>
	</BrowserRouter>
}
