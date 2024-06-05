import { Response, Request } from "express"
import User from "../models/User.model"
import { Schema } from "mongoose"
const jwt = require("jsonwebtoken")

declare global {
    namespace Express {
        interface Request {
            userId?: Schema.Types.ObjectId
        }
    }
}

const requireAuth = async (req: Request, res: Response, next: () => void) => {
    // Verify authentication
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    // Get token from header
    const token = authorization.split(' ')[1];

    // Try to retrieve user from db then attach id to request
    try {
        const {id} = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        req.userId = user._id;
        next();
    } catch(error) {
        console.log(error);
        res.status(401).json({ message: 'Request is not authorized '});
    }
};

export default requireAuth