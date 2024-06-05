import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
    _id:  Schema.Types.ObjectId,
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
    email: {type: String, require: true},
    password: {type: String, require: true},
    createdAt: {type: Date, default: Date.now}
})

export default mongoose.model<UserDocument>('User', userSchema);
