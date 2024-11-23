import { createRoot } from "react-dom/client";
import AuthManager from "./contexts/AuthContext.tsx";
import AppRoutes from "./AppRoutes.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
	<AuthManager>
		<AppRoutes/>
	</AuthManager>
);
