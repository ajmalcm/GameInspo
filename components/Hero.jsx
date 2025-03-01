'use client'
import React, { useEffect, useRef, useState } from "react";
import Button from "./Button.jsx";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import dynamic from "next/dynamic.js";
import { ScrollTrigger } from "gsap/all";

const VideoComponent = dynamic(() => import("./VideoComponent.jsx"), { ssr: false });
gsap.registerPlugin(ScrollTrigger)

const Hero = () => {

  const [currentindex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef();

  const upComingVideoIndex =(currentindex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex(upComingVideoIndex);
  };

  const handleVideoLoad = () => {
    setLoadedVideos(loadedVideos + 1);
  };

  useGSAP(() => {
    if (nextVideoRef.current) {
      gsap.set("#next-video", { visibility: "visible" });
      gsap.to("#next-video", {
        transformOrigin: "",
        scale: 1,
        width: "100%",
        height: "100%",
        duration: 1,
        ease: "power1.inOut",
        onStart: () => nextVideoRef.current.play(),
      });
    }
    gsap.from("#current-video", {
      transformOrigin: "center center",
      scale: 0,
      duration: 1.5,
      ease: "power1.inOut",
    });
  }, { dependencies: [currentindex], revertOnUpdate: true });

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
    });

    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0 0 0 0",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    }, { revertOnUpdate: true });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  useEffect(() => {
    if (loadedVideos === 2) {
      setLoading(false);
    }
  }, [loadedVideos]);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div onClick={handleMiniVdClick} className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100 ">
              <VideoComponent nextRef={nextVideoRef} src={getVideoSrc(upComingVideoIndex)} loop muted id="current-video" style="origin-center scale-150 object-cover object-center size-64"
                loadHandler={handleVideoLoad} />
            </div>
          </div>
          <VideoComponent nextRef={nextVideoRef} src={getVideoSrc(currentindex)} loop muted id="next-video"
            style="absolute-center invisible absolute z-20 object-cover object-center size-64"
            loadHandler={handleVideoLoad} />
          <video src={getVideoSrc(currentindex === totalVideos - 1 ? 1 : currentindex)} autoPlay loop muted className="absolute left-0 top-0 object-cover object-center size-full" />
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ">G<b>a</b>ming</h1>
        <div className="absolute left-0 top-0 size-full z-40">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">Redefi<b>n</b>e</h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter The Meta-game Layer <br />Unleash The Play Economy</p>
            <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass="!bg-yellow-300 flex-center gap-1" />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black ">G<b>a</b>ming</h1>
    </div>
  );
};

export default Hero;