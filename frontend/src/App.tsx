import { useContext } from "react";
import { logout } from "./service/AuthService"
import { AuthContext } from "./contexts/AuthContext";
import { LogOut } from "react-feather";

export default function App() {
	// const [count, setCount] = useState(0);
	const { setToken } = useContext(AuthContext);

	// #6C63FF

	return <div>
		<p>home page</p>

		<button onClick={() => {
			logout(setToken);
		}}>
			<LogOut />
		</button>
	</div>
}