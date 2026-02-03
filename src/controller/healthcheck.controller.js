import {ApiResponse} from '../utils/apiresponse.js';
import {asynchandler} from '../utils/async-handler.js';
/*
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
*/

const healthCheck = asynchandler(async (req, res) => {
    res.status(200).json(new ApiResponse(200, {message: "Server is still running"}));
});
export {healthCheck};
