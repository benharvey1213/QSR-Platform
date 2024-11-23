const API_URL = 'http://localhost:3000';

export async function login({ email, password }: { email: string, password: string }, setToken: Function) {
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