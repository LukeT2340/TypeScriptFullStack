import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
    email: string;
    password: string;
    createdAt: Date;
}

const userSchema = new Schema<UserDocument>({
    email: {type: String, require: true},
    password: {type: String, require: true},
    createdAt: {type: Date, require: true}
})

userSchema.pre('save', function(this: UserDocument, next: () => void) {
    this.createdAt = new Date();
    next();
});  

export default mongoose.model<UserDocument>('User', userSchema);
