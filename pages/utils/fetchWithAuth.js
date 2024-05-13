// utils/fetchWithAuth.js
import { useRouter } from 'next/router';

const fetchWithAuth = async (url, options) => {
    const router = useRouter();
    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        credentials: 'include'  // if you are dealing with cookies
    });

    if (!response.ok) {
        if (response.status === 401) {  // Assuming 401 means unauthorized
            // Redirect user to login page or homepage
            router.push('/');
        }
        throw new Error('Failed to fetch');
    }

    return response.json();
};

export default fetchWithAuth;
