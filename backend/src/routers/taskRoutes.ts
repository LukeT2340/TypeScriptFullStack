import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import Task from "../models/Task.model"
import requireAuth from "../middleware/requireAuth"
import Mongoose from "mongoose";

const router = express.Router()

router.use(bodyParser.json())
router.use(requireAuth)

interface UserParams {
    userId: string;
}

router.get("/fetch/:userId", async (req: Request<UserParams>, res: Response) => {
    const { userId } = req.params;
    
    try {
        const tasks = await Task.find({ userId: new Mongoose.Types.ObjectId(userId) });


        return res.status(200).json(tasks)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Server error', error });
    }
})

interface Task {
    title: string,
    body: string
}

router.post("/add", async (req: Request<UserParams>, res: Response) => {
    const task:Task = req.body
    console.log(req.body)
    try {
        const newTask = new Task({
            userId: req.userId,
            title: task.title,
            body: task.body
        })
        await newTask.save()

        return res.status(201).json(newTask)
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
})

module.exports = router