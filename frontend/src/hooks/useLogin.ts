import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

interface LoginHookInterface {
    login: (email: string, password: string) => void,
    error: string,
    loading: boolean
}

export const useLogin = (): LoginHookInterface => {
    const [error, setError] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const { dispatch } = useAuthContext()

    const login = async (email: string, password: string) => {
        setError("")
        setLoading(true)

        try {
            const response = await fetch("http://localhost:3000/user/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            })

            // Handle unsuccessful login
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            // Handle successful login
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
    }

    return { login, error, loading }
}