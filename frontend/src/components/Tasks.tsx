import React, { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import styles from "./Tasks.module.scss"

const Tasks:React.FC = () => {
    const { addTask, adding, tasks, loading, error } = useTasks()
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTitle("")
        setBody("")
        await addTask(title.trim(), body.trim())
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <div className={styles.tasksContainer}>
                {tasks.map((task) => {
                    return <Task task={task} key={task._id} />
                })}
                <form onSubmit={submitForm} className="d-flex flex-column">
                    <span>
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required></input>
                    </span>
                    <span>
                        <label>Body</label>
                        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} required></input>
                    </span>
                    <input type="submit" value="Add task" disabled={adding}></input>
                </form>
            </div>
        </div>
    )
}

interface TaskProps {
    task: {
        _id: string;
        userId: string,
        title: string,
        body: string,
        createdAt: Date
    },
    key: string
}

const Task:React.FC<TaskProps> = ({task}) => {
    return (
        <div className="d-flex justify-content-between">
            <h5>{task.title}</h5>
            <p>{task.body}</p>
        </div>
    )
}

export default Tasks