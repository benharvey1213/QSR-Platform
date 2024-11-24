import { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import graphic from "../assets/undraw_content_structure_re_ebkv.svg";
import { login } from "../service/AuthService";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loginPending, setLoginPending] = useState(false);
    const { setToken } = useContext(AuthContext);

    const navigate = useNavigate();

    function onSubmit(event: any) {
        event.preventDefault();

        setLoginPending(true);

        login({ email, password }, setToken).then(() => {
            console.log('logged in');
            setLoginPending(false);
            navigate('/');
        })
    }

    return <div className="w-full min-h-screen grid grid-cols-[3fr_2fr] bg-[#E9E9E9] p-3">
        <div className="w-full h-full grid place-items-center">
            <img className="w-full max-w-[300px]" src={graphic}/>
        </div>

        <div className="bg-white p-10 border rounded-2xl grid items-center">
            <div className="grid gap-16">
                <div className="grid gap-3">
                    <h1 className="text-4xl font-bold text-center">Welcome!</h1>
                    <p className="text-center text-sm">Please enter your details</p>
                </div>
                <form className="grid gap-16" onSubmit={onSubmit}>
                    <div className="grid gap-5">
                        <Input required placeholder="Email" value={email} setValue={setEmail} />
                        <Input required placeholder="Password" value={password} setValue={setPassword} type="password" />
                    </div>
                    <Button text="Log In" loading={loginPending} />
                </form>
            </div>

        </div>
    </div>
}