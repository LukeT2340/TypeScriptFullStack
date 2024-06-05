import { hash } from 'crypto';
import { create } from 'domain';
import express, { Request, Response } from 'express';
const bodyParser = require('body-parser')
const User = require('../models/User.ts')
const jwt = require("json-web-token")
const bcrypt = require("bcrypt")

const router = express.Router()

router.use(bodyParser.json())

// Creates token
const createToken = (id: string) => {
    return jwt.sign({ id }, "GARGRAGGGRAR#@%@%@R@FG$@T@$#%@R$@WCV", { expiresIn: '3d' });
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
        const hashedPassword = await hashPassword(password)

        const user = new User({
            email,
            password: hashedPassword
        })

        await user.save()

        const token = createToken(user._id)

        return res.status(200).json({ user_id: user._id, email: email, token: token})
    } catch (error) {
        return res.status(400).json({message: "Unknown server error", error})
    }
})

module.exports = router