import ReactPlayer from "react-player";
import {useEffect, useState} from "react";

function VideoPlayer({width, height, url ,onProgressData , progressData}) {
    const [playedTime, setPlayedTime] = useState(0);
    console.log(playedTime);

    useEffect(() => {
        if(playedTime === 1){
            onProgressData({
                ...progressData,
                progressValue : playedTime
            })
        }
    }, [playedTime]);


    return (
        <div className={"shadow-2xl rounded-lg"}>
            <ReactPlayer
                width={width}
                height={height}
                url={url}
                controls
                muted={true}
                className={"rounded-md"}
                onProgress={({ played }) => setPlayedTime(played)}

            />
        </div>
    );
}

export default VideoPlayer