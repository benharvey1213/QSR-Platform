import { LogOut } from "react-feather";
import { logout } from "../service/AuthService";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Header({ title, color } : { title: string, color: string }) {
    const { setToken } = useContext(AuthContext);

    return <div className="absolute top-0 left-0 right-0 h-[300px] p-10 grid grid-cols-[1fr_auto] items-start" style={{
        backgroundColor: color
    }}>
        <h1 className="text-xl font-bold text-white">{title}</h1>

        <button className="text-white" onClick={() => {
            logout(setToken);
        }}>
            <LogOut color="white" size={20}/>
        </button>
    </div>
}