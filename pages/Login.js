import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './Login.module.css';  

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.preventDefault();
            try {
                const response = await fetch('https://serene-garden-06954-1157675d5f4a.herokuapp.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password })
                });
                const data = await response.json();
                if (response.ok) {
                    localStorage.setItem('token', data.access_token); 
                    localStorage.setItem('user_id', data.user_id);
                    localStorage.setItem('username', data.username);
                    setMessage('Login successful');
                    router.push('/create_song');
                } else {
                    setMessage(data.msg || 'Login failed');
                }
            } catch (error) {
                console.error('Login error:', error);
                setMessage('Network error');
            }
        };
    
    const goHome = () => {
    router.push('/'); 
};


    return (
        <div className={styles.container}>
            <button onClick={goHome} className={styles.HomeButton}>home</button>
            <form onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.title}>Song Maker</h1>
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
                <button type="submit" className={styles.button}>Login</button>
                {message && <p className={styles.message}>{message}</p>}
            </form>
        </div>
    );
}




export default Login;
