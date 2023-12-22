import React, { useState, useEffect } from 'react'
import './Realestate.scss'
import Sidebar from './Menu';
import { Player, ControlBar } from "video-react"
import img1 from '../../assets/image/12.jpg';
import img2 from '../../assets/image/13.jpg';
import img3 from '../../assets/image/14.jpg';
import img4 from '../../assets/image/15.jpg';
import img5 from '../../assets/image/16.jpg';
import img6 from '../../assets/image/17.jpg';
import img7 from '../../assets/image/19.jpg';
import img8 from '../../assets/image/20.jpg';
import img9 from '../../assets/image/21.jpg';
import img10 from '../../assets/image/22.jpg';
import video1 from '../../assets/videos/video1.mp4';
import video2 from '../../assets/videos/video-2.mp4';
import video3 from '../../assets/videos/video3.mp4';
import video4 from '../../assets/videos/video4.mp4';
import video5 from '../../assets/videos/video5.mp4';
import video6 from '../../assets/videos/video6.mp4';
import video7 from '../../assets/videos/video7.mp4';
import video8 from '../../assets/videos/video8.MOV';


import "video-react/dist/video-react.css"
import ReactPlayer from 'react-player'
export default function Memories() {
    const [videoAspect, setVideoAspect] = useState(16 / 9);
    useEffect(() => {
        const video = document.createElement("video");
        video.src = "/path/to/your/local/video.mp4";
        video.addEventListener("loadedmetadata", () => {
            const aspectRatio = video.videoWidth / video.videoHeight;
            setVideoAspect(aspectRatio);
        });
    }, []);
    const images = [
        { img: img1 },
        { img: img2 },
        { img: img3 },
        { img: img4 },
        { img: img5 },
        { img: img6 },
        { img: img7 },
        { img: img8 },
        { img: img9 },
    ]

    const videos = [
        { video: video1 },
        { video: video2 },
        { video: video3 },
        { video: video4 },
        { video: video5 },
        { video: video6 },
        { video: video7 },
        { video: video8 },


    ]
    return (
        <div>
            <Sidebar />
            <div className=' pt-3' style={{ justifyContent: "center", alignItems: "center", textAlign: "center", flex: "column" }}>
                <h4>2021 Kalam Memories</h4>
            </div>
            <div className='main_tour'>

                {
                    videos.map((item, index) => {

                        return (
                            <div key={index} className='tour'>
                                <div className='event'>
                                    <div className="pic">
                                        <ReactPlayer url={item.video} playing={false}
                                            controls={true}
                                            style={{ borderRadius: "5px",maxWidth: "300px", maxHeight: "437px",}}
                                        />
                                    </div>
                                </div>
                            </div>
                        )

                    })
                }
                {/* <ReactPlayer url={dummy} playing={false}
                    controls={true}
                    style={{ maxWidth: "800px", maxHeight: "437px", borderRadius: "5px" }}
                /> */}
                <div className='tour_content'>
                    {images.map((item, index) => {
                        return (
                            <div key={index} className='tour'>
                                <div className='event'>
                                    <div className="pic">
                                        <img src={item.img} />
                                        {/* <video src={yahoo} width="800" height="400" controls /> */}
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}