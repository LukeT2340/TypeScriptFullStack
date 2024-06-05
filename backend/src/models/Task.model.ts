import mongoose, { Document, Schema } from 'mongoose'

interface TaskDocument extends Document {
    userId: Schema.Types.ObjectId,
    title: string,
    body: string,
    createdAt: Date
}

const taskSchema = new Schema<TaskDocument>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    title: { type: String, required: true},
    body: { type: String, required: true},
    createdAt: { type: Date, default: new Date() }
})

export default mongoose.model<TaskDocument>('Task', taskSchema)