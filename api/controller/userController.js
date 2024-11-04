import {errorHandler} from "../helper/errorHandler.js";
import {validatePassword} from "../helper/validatePassword.js";
import bcrypt from "bcryptjs";
import User from "../model/userSchema.js";

export const userUpdate = async (req,res,next)=>{
    try{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401 , "You Can Only Update Your Own Account"));
        }

        // validating email...
        let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        if(req.body.email){
            if (!regex.test(req.body.email)) {
                return next(errorHandler(400, "Invalid Email"));
            }
        }



        //validating and hashing the password if provided...
        if(req.body.password){
            if (req.body.password.length < 8 || req.body.password.length > 12) {
                return next(errorHandler(400, "Password Must be 8 OR 12 Char Long"));
            }
            //validate the password
            if (!validatePassword(req.body.password)) {
                return next(errorHandler(400, "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."));
            }
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        //check if username already exists...
        const user = await User.find();
        const isUserNameTaken = user?.some(user => user.username === req.body.username);
        if (isUserNameTaken) {
            return next(errorHandler(409, "Username already taken try different one"));
        }

        //finally update the DB with new data
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set : {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    avatar: req.body.avatar,
                }
            },{ new : true});

        const { password: pass , ...rest} = updatedUser._doc;
        res.status(200).json({
            success : true,
            message : "Profile Updated Successfully",
            userData : rest,
        })
    }catch(err){
        return next(errorHandler(500 , "Internal Server Error"));
    }
}





export const userSignout = async (req,res,next)=>{
    try{
        res.clearCookie("token").status(200).json({ success: true, message: "Sign out successfully🙌" });
    }catch (e){
        return next(errorHandler(500 , "Failed To sign out"));
    }
}