import {errorHandler} from "../../helper/errorHandler.js";
import {deleteFromMedia, uploadToMedia} from "../../helper/cloudinary.js";

export const uploadMediaFile = async (req,res,next)=>{
    try{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401, "You Cannot Upload Media File, This is For Admin Only"));
        }
        const result = await uploadToMedia(req?.file?.path);
        console.log(result);
        if(!result){
            return next(errorHandler(400, "Error Not Getting Result"));
        }
        res.status(200).json({success:true , data:result , message: "Asset Uploaded Successfully"});
    }catch (e) {
       console.log(e);
       next(errorHandler(500 , "Failed to upload File"));
    }
}

export const bulkUpLoadMedia = async (req,res,next)=>{
    try{
        if(req.user.id !== req.params.id){
            return next(errorHandler(401, "You Cannot Upload Media File, This is For Admin Only"));
        }
        const bulkUploadPromises = req?.files?.map(fileItem=> uploadToMedia(fileItem?.path));
        const result = await Promise.all(bulkUploadPromises);
        res.status(200).json({success:true , data:result , message : "Bulk Upload Successful"});
    }catch (e) {
        console.log(e);
        next(errorHandler(500 , "Failed to bulk upload File"));
    }
}

export const deleteMedia = async (req,res,next)=>{
    try{
        const { id , userID} = req.params;
        if(req.user.id !== userID){
            return next(errorHandler(401, "You Cannot Delete Media File, This is For Admin Only"));
        }
        if(!id){
            return next(errorHandler(500, "Public ID is missing"));
        }
        await deleteFromMedia(id);
        res.status(200).json({success:true , message : "Asset Successfully Deleted"});
    }catch (e) {
        console.log(e);
        next(errorHandler(500 , "Failed to Delete File"));
    }
}