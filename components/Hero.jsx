
'use client'
import React, { useRef, useState } from "react";
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import { useGSAP } from "@gsap/react";

const Hero = () => {

    const [currentindex,setCurrentIndex]=useState(1);
    const [hasClicked,setHasClicked]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    const [loadedVideos,setLoadedVideos]=useState(0);

    const totalVideos=4;
    const nextVideoRef=useRef(null);

    const upComingVideoIndex=(currentindex % totalVideos) + 1;

    const handleMiniVdClick=()=>{
        setHasClicked(true);
        setCurrentIndex(upComingVideoIndex)
    }

    const handleVideoLoad=()=>{
      setLoadedVideos((prev)=>prev+1);
    }
    useGSAP(()=>{
      
    },{dependencies:[currentindex],revertOnUpdate:true})

    const getVideoSrc=(index)=>`videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 ">
            <video ref={nextVideoRef} src={getVideoSrc(upComingVideoIndex)} loop muted id="current-video" className="origin-center scale-150 object-cover object-center size-64" onLoadedData={handleVideoLoad}/>
            </div>
          </div>
            <video ref={nextVideoRef} src={getVideoSrc(currentindex)} loop muted  id="next-video" 
              className="absolute-center invisible absolute z-20 object-cover object-center size-64"
               onLoadedData={handleVideoLoad}/>
               <video src={getVideoSrc(currentindex===totalVideos-1?1:currentindex)} autoPlay loop muted className="absolute left-0 top-0 object-cover object-center size-full"/>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ">G<b>a</b>ming</h1>
        <div className="absolute left-0 top-0 size-full z-40">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">Redefi<b>n</b>e</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter The Meta-game Layer <br/>Unleash The Play Economy</p>
            <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>} containerClass="!bg-yellow-300 flex-center gap-1"/>
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black ">G<b>a</b>ming</h1>
    </div>
  );
};

export default Hero;
