import mongoose, { Schema } from 'mongoose';
import { AvailableUserRoles, TaskStatusEnum } from '../utils/constants.js';

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String, 
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true 
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignedTo
    : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },  
    status: {
        type: String,
        enum: TaskStatusEnum,
        default: TaskStatusEnum.TODO
    },
    attachments: {
        type: [{
            url: String,
            mimetype: String,
            size: Number
        }],
        default: []
    }
},
{timestamps: true}
);
export default mongoose.model('Task', taskSchema);