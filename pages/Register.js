// src/components/Register.js
import React, { useState } from 'react';
import styles from './Register.module.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('API URL:', process.env.REACT_APP_API_URL);

            const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage('Registration successful');
            } else {
                setMessage(data.error || 'Registration failed');
            }
        } catch (error) {
            setMessage('Network error');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1 className={styles.title}>Register</h1>
                <div className={styles.inputField}>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputField}>
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputField}>
                    <label>Password:</label>
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