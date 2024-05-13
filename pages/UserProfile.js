import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './UserProfile.module.css';  // Import your module here

function UserProfile() {
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState('');
    const [username, setUsername] = useState('');  // Store username in state
    const router = useRouter();

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Code here will only run on the client side
            const storedUsername = localStorage.getItem('username');
            const userId = localStorage.getItem('user_id');
            setUsername(storedUsername);  // Update state with username

            if (!userId) {
                setError('User not identified');
                return;
            }

            const fetchSongs = async () => {
                try {
                    const response = await fetch(`https://serene-garden-06954-1157675d5f4a.herokuapp.com/api/user/songs?user_id=${userId}`, {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    if (!response.ok) {
                        throw new Error('Failed to fetch songs');
                    }
                    const data = await response.json();
                    setSongs(data);
                } catch (error) {
                    setError(error.message);
                }
            };

            fetchSongs();
        }
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('https://serene-garden-06954-1157675d5f4a.herokuapp.com/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                console.log('Logged out successfully');
                localStorage.removeItem('token');  // Remove the token from local storage
                router.push('/').catch(err => console.error('Redirection failed:', err)); // Ensure correct case and path
            } else {
                throw new Error('Failed to log out on server');
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const goToCreateSong = () => {
        router.push('/create_song');  // Redirect to the Create Song page
    };

    if (error) {
        return <p className={styles.message}>Error: {error}</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{username ? `${username}'s Profile` : "User Profile"}</h1>
            <h2 className={styles.title}>My Songs</h2>
            <ul className={styles.list}>
                {songs.map(song => (
                    <li key={song.Song_ID} className={styles.songDetails}>
                        Title: {song.Title}, Genre: {song.Genre}, Danceability: {song.Dancability}
                        <br/>
                        Instruments: {song.Instrument_Names}, Chord Progressions: {song.Chord_Progressions}
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout} className={styles.button}>Logout</button>
            <button onClick={goToCreateSong} className={styles.button}>Create Another Song</button>
        </div>
    );
}

export default UserProfile;
