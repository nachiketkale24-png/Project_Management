import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema(
    {
        avatar: {
            type: {
            url: String,
            localPath: String,
        },
        default: {
            url: 'https://placehold.co/200x200',
            localPath: ""
        }
        },
        username:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        fullname: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        refreshTokens: {
            type: String
        },
        forgotPasswordToken:{
            type : String
        },
        emailVerificationToken:{
            type : String
        },
        emailVerificationExpiry:{
            type : Date
        }
    },{
        timestamps: true,
    }
);


userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
     
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function
(password){
    return await bcrypt.compare(password, this.password);  
};



export const User = mongoose.model('User', userSchema);