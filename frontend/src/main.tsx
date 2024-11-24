import { createRoot } from "react-dom/client";
import AuthManager from "./contexts/AuthContext.tsx";
import AppRoutes from "./AppRoutes.tsx";
import "./index.css";

export const API_URL = import.meta.env.VITE_APP_API_URL;

createRoot(document.getElementById("root")!).render(
	<AuthManager>
		<AppRoutes/>
	</AuthManager>
);