import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadToMedia = async (filePath ,resource_type)=>{
    try{
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type : resource_type ?? "auto",
            folder : "mern-lms"
        });
        return result;
    }catch (err){
        console.log(err);
    }
}

export const deleteFromMedia = async (publicID)=>{
    try {
        console.log(publicID);
        await cloudinary.uploader.destroy(publicID);
    }catch (e){
        console.log(e);
        throw new Error("Failed To Delete from Media");
    }
}

