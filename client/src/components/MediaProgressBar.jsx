import {useEffect, useState} from "react";
import {motion} from "framer-motion";

function MediaProgressBar({ isMediaUploading , progress}) {
    const[showProgress , setShowProgress] = useState(false);
    const[animatedProgress , setAnimatedProgress] = useState(0);

    useEffect(()=>{
        if(isMediaUploading){
            setShowProgress(true);
            setAnimatedProgress(progress);
        }else{
            const timer = setTimeout(()=>{
                setShowProgress(false);
            },1000);

            return ()=> clearTimeout(timer);
        }
    },[isMediaUploading , progress]);


    return (
        <div className={"w-full bg-gray-200 rounded-md h-2 mb-4 relative overflow-hidden mt-3"}>
            <motion.div className={"h-2 rounded-full bg-blue-500"}
            initial={{ width:0 }}
            animate={{
                width : `${animatedProgress}%`,
                transition : { duration : 0.5 , ease : "easeInOut"}
            }}
            >
                {progress >=100 && isMediaUploading  && (
                    <motion.div className={"absolute top-0 left-0 right-0 bottom-0 bg-blue-300 opacity-50"}
                                animate={{
                                    x:["0%" , "100%", "0%"]
                                }}
                                transition={{duration : 2 , ease : "easeInOut" , repeat  : Infinity}}
                    >

                    </motion.div>
                )}

            </motion.div>
        </div>
    )
}
export default MediaProgressBar

