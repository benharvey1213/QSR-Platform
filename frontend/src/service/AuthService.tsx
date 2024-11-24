import { API_URL } from "../main";

export async function login({ email, password }: { email: string, password: string }, setToken: Function, setRole: Function) {
    fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(data => {
        const token = data.access_token;

        if (token) {
            localStorage.setItem('token', token);
            setToken(token);
            setRole(data.role);
            return true;
        }
        else {
            return false;
        }
    }).catch(err => {
        console.error(err);
        return false;
    })
}

export function logout(setToken: Function) {
    localStorage.removeItem('token');
    setToken(null);
}

export async function verifyToken(token: string) {
    try {
        const response = await fetch(`${API_URL}/auth/profile`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
    }
    catch (error) {
        console.error('Error verifying token:', error);
        throw error;
    }
}