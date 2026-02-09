import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema({
    name: {
        type: String,
        reqiured: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }   
},{
    timestamps: true
});

export default mongoose.model('Project', projectSchema);
