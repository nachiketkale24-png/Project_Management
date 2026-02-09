import mongoose, { Schema } from 'mongoose';

const subTaskSchema = new Schema({
    title:{
        type: String,
        required: true,
        trim: true  
    },task: {
        type: mongoose.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: Boolean,
        ref: 'User',
        required: true 
    }
},{
    timestamps: true
}
    
export const