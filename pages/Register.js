import React, { useState } from 'react';
import styles from './Register.module.css';
import { useRouter } from 'next/router';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('API URL:', process.env.REACT_APP_API_URL);

            const response = await fetch('https://serene-garden-06954-1157675d5f4a.herokuapp.com/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Registration successful go back home and log in');
            } else {
                setMessage(data.error || 'Registration failed');
            }
        } catch (error) {
            setMessage('Network error');
        }


    };

    const goHome = () => {
        router.push('/');
    };

    return (
        <div className={styles.container}>
            <button onClick={goHome} className={styles.HomeButton}>home</button>
            <div className={styles.form}>
                <h1 className={styles.title}>Register</h1>
                <div className={styles.inputField}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputField}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputField}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <button type="submit" className={styles.button} onClick={handleSubmit}>Register</button>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        </div>
    );
}

export default Register;