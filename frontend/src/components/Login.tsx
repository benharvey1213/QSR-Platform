import { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import graphic from "../assets/undraw_content_structure_re_ebkv.svg";
import { login } from "../service/AuthService";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginPending, setLoginPending] = useState(false);
    const { setToken, setRole } = useContext(AuthContext);

    const [failedToAuthenticate, setFailedToAuthenticate] = useState(false);

    function onSubmit(event: any) {
        event.preventDefault();

        setLoginPending(true);

        login({ email, password }, setToken, setRole).then((success) => {
            if (!success) {
                setLoginPending(false);
                setFailedToAuthenticate(true);
                setPassword("");
            }
        })
    }

    return <div className="w-full min-h-screen grid lg:grid-cols-[1fr_500px] bg-[#E9E9E9] p-3">
        <div className="w-full h-full place-items-center hidden lg:grid">
            <img className="w-full max-w-[400px] p-10" src={graphic}/>
        </div>

        <div className="bg-white p-10 border rounded-2xl grid items-center">
            <div className="grid gap-16">
                <div className="grid gap-3">
                    <h1 className="text-4xl font-bold text-center">Welcome!</h1>
                    <p className="text-center text-sm">Please enter your details</p>
                </div>
                <form className="grid gap-8" onSubmit={onSubmit}>
                    <div className="grid gap-5">
                        <Input required placeholder="Email" value={email} setValue={setEmail} />
                        <Input required placeholder="Password" value={password} setValue={setPassword} type="password" />
                    </div>

                    <span className={`text-red-500 text-center ${failedToAuthenticate ? "" : "opacity-0"}`}>Failed to authenticate</span>

                    <Button text="Log In" loading={loginPending} />
                </form>
            </div>

        </div>
    </div>
}