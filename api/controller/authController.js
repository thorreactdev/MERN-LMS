import {errorHandler} from "../helper/errorHandler.js";
import {validatePassword} from "../helper/validatePassword.js";
import User from "../model/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const authRegister = async (req, res, next) => {
    try {
        const {username, email, password, role } = req.body;
        if (!username || !email || !password) {
            return next(errorHandler(400, "All The Fields Are Required"));
        }
        let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        if (!regex.test(email)) {
            return next(errorHandler(400, "Invalid Email"));
        }
        if (password.length < 8 || password.length > 12) {
            return next(errorHandler(400, "Password Must be 8 OR 12 Char Long"));
        }
        //validate the password
        if (!validatePassword(password)) {
            return next(errorHandler(400, "Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters."));
        }

        // getting all user data for checking username already exists

        const userData = await User.find();
        const isUsernameTaken = userData?.some(user => user.username === username);
        if (isUsernameTaken) {
            return next(errorHandler(409, "Username already taken try different one"));
        }

        //check existing User
        const existingUser = await User.findOne({email: email});
        if (existingUser) {
            return next(errorHandler(409, "Email already exists Please Go and login"));
        }

        // hashing the password
        const hashPassword = bcrypt.hashSync(password, 10);
        const newUserData = new User({
            username: username,
            email: email,
            password: hashPassword,
            role: role,
            isGoogleLogin : false
        });
        await newUserData.save();
        // Emit a socket event for successful registration
        req.io.emit('registrationSuccess', {
            message: `${username} registered successfully 🚀❤️!`
        });
        return res.status(201).json({success: true, message: 'Congrats🚀 Registration Successful'});
    } catch (err) {
        return next(errorHandler(500, "Failed To Create User"));
    }
}

export const authLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
        if (!regex.test(email)) {
            return next(errorHandler(400, "Invalid Email"));
        }
        if (!email || !password) {
            return next(errorHandler(400, "All The Fields Are Required"));
        }
        const existingUser = await User.findOne({ email: email });
        if (!existingUser) {
            return next(errorHandler(400, "User not found please create an account"));
        }
        const isPasswordValid = bcrypt.compareSync(password, existingUser?.password);
        if (!isPasswordValid) {
            return next(errorHandler(400, 'Invalid Password'));
        }
        const token = jwt.sign({id: existingUser?._id}, process.env.JWT_SECRET, {expiresIn: "2d"});
        console.log(token);
        const {password: pass, ...rest} = existingUser._doc;
        res.cookie("token", token, {httpOnly: true}).status(200).json({
            success: true,
            token: token,
            userData: rest,
            message: `Welcome ${existingUser?.username} Your Future is Sunshine🚀👍`
        });

    } catch (e) {
        return next(errorHandler(500, "Failed To Login"));
    }
};

export const googleLogin =  async (req, res, next) => {
    try{
        const { email , username , avatar } = req.body;
        const alreadyGoogleUser = await User.findOne( { email });
        if(alreadyGoogleUser){
            const token = jwt.sign({id: alreadyGoogleUser._id}, process.env.JWT_SECRET, {expiresIn: "2d"});
            const { password : pass , ...rest} = alreadyGoogleUser._doc;
            res.cookie("token" , token, {httpOnly: true}).status(200).json({
                success: true,
                token: token,
                userData: rest,
                message: `Welcome ${alreadyGoogleUser?.username} Your Future is Sunshine🚀👍`
            })
        }else{
            const generatePassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashPassword = bcrypt.hashSync(generatePassword , 10);

            const newGoogleUser = new User({
                username : username.toLowerCase().split(" ").join("") + Math.random().toString(9).slice(-4),
                email : email,
                password : hashPassword,
                avatar : avatar,
                isGoogleLogin : true,
            });
            await newGoogleUser.save();
            req.io.emit('registrationSuccess', {
                message: `${username} registered successfully 🚀❤️!`
            });
            const token = jwt.sign({id: newGoogleUser?._id}, process.env.JWT_SECRET, {expiresIn: "2d"});
            const { password : pass , ...rest } = newGoogleUser._doc;
            res.cookie("token", token, {httpOnly: true}).status(200).json({
                success : true,
                message : `Welcome ${newGoogleUser?.username} Your Future is Sunshine🚀👍`,
                userData : rest,
                token : token
            })
        }
    }catch (e){
        return next(errorHandler(500, "Failed to authenticate."));
    }
}