import {ApiResponse} from '../utils/apiResponse.js';

const healthCheck = async async (req,res,next) => {
    try{
        const user = await getUserFromDB()
        res
        .status(200)
        .json(new ApiResponse(200, {message: "Server is running"}));
    }catch(error){
        next(err)
    }
};

export {healthCheck};