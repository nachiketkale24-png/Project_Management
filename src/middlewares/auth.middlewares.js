import {user} from '../models/index.js';
import { ApiError } from '../utils/apierror.js';
import { asynchandler } from '../utils/async-handler.js';
import jwt from 'jsonwebtoken';

export const verifyJWT = asynchandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        throw new ApiError(401, "Unauthorized: No token provided");
    }   
    try{
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await user.findById(decoded?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
        );
        if (!user) {
            throw new ApiError(401, "Unauthorized: User not found");
        }
        req.user = user;
        next()
    }catch(error){
        throw new ApiError(401, "Unauthorized: Invalid token");
    }
});