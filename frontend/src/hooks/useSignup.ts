import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

// Registration hook
export const useSignup = () => {
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); 
    const { dispatch } = useAuthContext();
    
    const register = async (email: string, password: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3000/user/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email, 
                    password
                })
            });
            // Handle unsuccessful sign up
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // Handle successful sign up
            const json = await response.json();

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // Update auth context
            dispatch({ type: 'LOGIN', payload: json });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("An unknown error occurred")
            }
        } finally {
            setLoading(false)
        }
    };

    return { register, loading, error };
};