import React, { useState, useEffect } from 'react';
import styles from './CreateSong.module.css';
import { useRouter } from 'next/router';


export default function CreateSong() {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [dancability, setDancability] = useState('1');  // Default to 'Not really danceable'
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [songDetails, setSongDetails] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token'); // Ensure the token is actually being retrieved
        console.log("Token sent with request:", token); // Debugging line
        if (!token) {
            console.log('No token found, user might not be logged in');
            return;
        }
        fetch('https://serene-garden-06954-1157675d5f4a.herokuapp.com/api/genres', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch genres');
            }
            return response.json();
        })
        .then(data => setGenres(data))
        .catch(error => {
            console.error('Error fetching genres:', error);
            setMessage('Failed to load genres');
        });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        
        if (!token) {
            setMessage('No authentication token found. Please log in again.');
            return;
        }
        try {
            const response = await fetch('https://serene-garden-06954-1157675d5f4a.herokuapp.com/api/make_song', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    genre: selectedGenre,  
                    dancability: dancability,
                    title: title
                })
            });
            console.log("Sending payload:", JSON.stringify({
                genre: selectedGenre,  
                dancability: dancability,
                title: title
            }));
    
            if (!response.ok) {
                if (response.status === 422) {
                    // Custom message for status 422
                    setMessage("Sorry we don't have this combination try again :)");
                } else {
                    // Use the server's error message or default to a general error message
                    setMessage(data.error || "Failed to create song due to a server error.");
                }
                setSongDetails(null);
                return; // Stop further execution in case of an error
            }
            const data = await response.json();
            localStorage.setItem('user_id', data.user_id);
            if (data.access_token) {
                localStorage.setItem('token', data.access_token); // Update the token if a new one is received
            }
            setMessage("Song created successfully!");
            setSongDetails(data.song_details);
        } catch (error) {
            console.error('Fetch error:', error);
            setMessage(error.message || 'Failed to fetch');
            setSongDetails(null);
        }
    };

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

    const goToProfile = () => {
        router.push('/UserProfile'); // Redirect to profile page
    };
    
    

return (
    <div className={styles.container}>
        <button onClick={goToProfile} className={styles.profileButton}>Go to Profile</button>
        <button onClick={handleLogout} className={styles.logoutButton}>  Logout</button>
        {!songDetails ? (
            <div>
                <h1 className={styles.title}>Create a new song inspo</h1>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.row}>
                    <div className={styles.inputField}>
                        <label>Genre</label>
                        <select className={styles.select} value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
                            {genres.map(genre => (
                                <option key={genre.id} value={genre.name}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.inputField}>
                        <label>Dancability</label>
                        <select className={styles.select} value={dancability} onChange={e => setDancability(e.target.value)}>
                            <option value="1">Not Danceable</option>
                            <option value="2">slightly Danceable</option>
                            <option value="3">Very Danceable</option>
                        </select>
                    </div>
                    <div className={styles.inputField}>
                        <label>Title</label>
                        <input type="text" className={styles.input} value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    </div>  
                    <button type="submit" className={styles.button}>Create Song</button>
                </form>
                <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
            </button>
                {message && <p className={styles.message}>{message}</p>}
            </div>
        ) : (
            <div className={styles.container}>
            <h2 className={styles.header}>Your Creation</h2>
            <div className={styles.songDetails}>
                <p className={styles.detail}><strong>Title:</strong> {songDetails.Title}</p>
                <p className={styles.detail}><strong>Dancability:</strong> {songDetails.Dancability}</p>
                <p className={styles.detail}><strong>Artist:</strong> {songDetails.Artist}</p>
                <p className={styles.detail}><strong>Lyrics:</strong> {songDetails.Lyrics}</p>
                <p className={styles.detail}><strong>Creation Date:</strong> {songDetails.Creation_Date}</p>
                <p className={styles.detail}><strong>Released Status:</strong> {songDetails.Released_Status}</p>
                <p className={styles.detail}><strong>Time Signature:</strong> {songDetails.Time_Signature}</p>
            </div>
            <div className={styles.instruments}>
                {songDetails.instruments.map((instrument, index) => (
                    <div key={index} className={styles.instrumentDetail}>
                        <p>Name: {instrument.name}</p>
                        <p>Ethnic Influence: {instrument.ethnic_influence}</p>
                        <p>Chord Progression: {instrument.chord_progression}</p>
                    </div>
                ))}
            </div>
        </div>
        )}
    </div>
);
}