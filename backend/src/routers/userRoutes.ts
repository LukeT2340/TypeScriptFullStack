import express, { Request, Response } from 'express';
const bodyParser = require('body-parser')
import User, { UserDocument } from '../models/User.model'; 
import { Schema } from 'mongoose';
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const router = express.Router()

router.use(bodyParser.json())

// Creates token
const createToken = (id: Schema.Types.ObjectId) => {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '3d' });
}
  
// Hashes passwords
async function hashPassword(password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds of 10
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}
  
// Login endpoint
router.post("/login", async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "Incorrect email" })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        
        if (!isValidPassword) {
            return res.status(400).json({ message: "Incorrect password" })
        }

        const token = createToken(user._id)

        return res.status(200).json({ user_id: user._id, email: email, token: token})
    } catch (error) {
        console.log(error)
        return res.status(400).json({message: "Unknown server error", error})
    }
})

// Signup endpoint
router.post("/signup", async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const hashedPassword = await hashPassword(password)

        const user = new User({
            email,
            password: hashedPassword            
        })

        user.save()


        const token = createToken(user._id)
        return res.status(200).json({ user_id: user._id, email: email, token: token})
    } catch (error) {
       console.log(error)
       return res.status(400).json({message: "Unknown server error", error})
    }
})

module.exports = router