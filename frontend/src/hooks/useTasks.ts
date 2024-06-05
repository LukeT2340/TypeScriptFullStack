import React, { useState, useEffect } from "react"
import { useAuthContext } from "./useAuthContext"

interface Task {
    _id: string,
    userId: string,
    title: string,
    body: string,
    createdAt: Date
}

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const [adding, setAdding] = useState<boolean>(false)

    const { user } = useAuthContext()
    const token = user.token

    useEffect(() => {
        const fetchTasks: ()=>Promise<void> = async () => {
            setLoading(true)
            setError("")
            try {
                const response = await fetch(`http://localhost:3000/task/fetch/${user.user_id}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                })

                if (!response.ok) {
                    const errorData = await response.json()
                    throw new Error(errorData)
                }

                const data = await response.json()
                setTasks(data)
            } catch (error) {
                if (error instanceof Error) { 
                    setError(error.message)
                } else {
                    setError("Unknown error")
                }
            } finally {
                setLoading(false)
            }
        }

        fetchTasks()
    }, [])

    const addTask: (title: string, body: string) => Promise<void> = async (title, body) => {
        setAdding(true)
        setError("")
        try {
            const response = await fetch("http://localhost:3000/task/add", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title,
                    body
                })
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData)
            }
            
            const newTask = await response.json()

            setTasks(tasks => [...tasks, newTask])
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message)
            } else {
                setError("Unknown error")
            }
        } finally {
            setAdding(false)
        }
    }

    return { addTask, adding, tasks, error, loading }
}