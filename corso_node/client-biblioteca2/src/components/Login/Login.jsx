import { useState } from "react";

export default function Login({ onLogin }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLogin(e) {
        e.preventDefault();  // impedisce alla pagina di aggiornarsi dopo il click sul submit

        fetch('http://localhost:3000/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
            .then(res => res.json())
            .then(data => {
                onLogin(data.data);
                if (!data.success) {
                    // se il login non è andato a buon fine, mostro un alert con il messaggio di errore
                    alert(data.message);
                }
            }).catch(err => console.error(err))
    }

    return (
        <>
            <h3>login</h3>
            <form onSubmit={handleLogin}>
                <label>email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br />
                <label>password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit">accedi</button>
            </form>
        </>
    )
}
