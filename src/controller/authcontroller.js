import { User} from '../models/user.models.js';
import { ApiResponse } from '../utils/apiresponse.js';
import { asynchandler } from '../utils/async-handler.js';
import { ApiError }  from '../utils/apierror.js';
import {sendEmail} from '../utils/mail.js';
import {emailVerificationMailgenContent} from '../utils/mail.js';

const generateAccessAndRefreshToken = async (userId)=> {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});
        return {accessToken, refreshToken};
    }
    catch(err){ 
        throw new ApiError(500, "Error generating tokens");
    }
}
const registerUser = asynchandler(async (req, res) => {
        const { username, email, password, role } = req.body;
        
        const existedUser = await User.findOne({
            $or: [{ email: email }, { username: username }],
        })
        if (existedUser) {
            throw new ApiError(400, "User with given email or username already exists");
        }
        const newUser = new User({
            username,
            email,
            password,
            role,
        });
        
        const {unhashedToken, hashedToken, TokenExpiry} = newUser.generateEmailVerificationToken();

        newUser.emailVerificationToken = hashedToken;
        newUser.emailVerificationExpiry = TokenExpiry;
        await newUser.save({validateBeforeSave: true});
        await sendEmail(
            {
                email: newUser.email,
                subject: "Email Verification - Task Manager",
                mailgenContent: emailVerificationMailgenContent(
                    newUser.username,
                    `${req.protocol}://${req.get("host")}/api/v1/users/verify-email/${unhashedToken}`,
                )
            }   
        );

        const createdUser = await User.findByIdAndUpdate(newUser._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry");

        if(!createdUser){
            throw new ApiError(500, "Error creating user"); 
        }
        return res.status(201).json(new ApiResponse(200, "User registered successfully", {user: createdUser}));
});

export { registerUser };
