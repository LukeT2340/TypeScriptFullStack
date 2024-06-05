import React, { useState } from "react"
import { useTasks } from "../hooks/useTasks"
import styles from "./Tasks.module.scss"

const Tasks:React.FC = () => {
    const { addTask, adding, tasks, loading, error } = useTasks()
    const [title, setTitle] = useState<string>("")
    const [body, setBody] = useState<string>("")
    const [showNewTaskForm, setShowNewTaskForm] = useState<boolean>(false)

    const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setTitle("")
        setBody("")
        await addTask(title.trim(), body.trim())
    }

    return (
        <div className="d-flex vh-100 flex-column justify-content-center align-items-center">
            <div className={`${styles.tasksContainer} col-4 justify-content-center`}>
                <div className={`${styles.tasksBox} d-flex flex-column border rounded p-5 align-items-center`}>
                    {tasks.map((task) => {
                        return <Task task={task} key={task._id} />
                    })}
                    {showNewTaskForm ? (
                        <form onSubmit={submitForm} className="d-flex flex-column">
                            <span>
                                <label>Title</label>
                                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required></input>
                            </span>
                            <span>
                                <label>Body</label>
                                <textarea value={body} onChange={(e) => setBody(e.target.value)} required></textarea>
                            </span>
                            <input type="submit" value="Add task" disabled={adding}></input>
                        </form>
                    ) : (
                        <button onClick={() => setShowNewTaskForm(true)} >New Task</button>
                    )}
                </div>
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
    const userFriendlyDate = (date: Date): string => {
        const dateObj = new Date(date);
        const year = dateObj.getFullYear();
        const hour = dateObj.getHours();
        const minute = dateObj.getMinutes();
        let returnValue = "";
        const dateNow = new Date();
        if (year !== dateNow.getFullYear()) {
            returnValue += year;
        }
        if (dateObj.getDate() !== dateNow.getDate()) {
            returnValue += dateObj.getDate();
        }
        returnValue += `${hour} : ${minute}`;
        return returnValue;
    };
    
    
    return (
        <div className="d-flex justify-content-between w-100">
            <h5>{task.title}</h5>
            <p>{userFriendlyDate(task.createdAt)}</p>
        </div>
    )
}

export default Tasks