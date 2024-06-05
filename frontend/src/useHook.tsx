import { useState, useEffect } from "react"

export const useHook = () => {
    const [result, setResult] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const func = async () => {
            setError("")
            setLoading(true)
            try {
                const response = await fetch("http://localhost:3000", {
                    method: "GET"
                  });

                if (!response.ok) {
                    throw new Error("Error fetching from API")
                }
                console.log(response)
                const data = await response.text()
                setResult(data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }

        }

        func()
    }, [])
    return { result, error, loading }
}