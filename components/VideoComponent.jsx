"use client"
import React, { useEffect, useRef } from "react";

const VideoComponent = ({ nextRef, src, id = "", style = "", loadHandler }) => {
  const internalRef = useRef(null);

  useEffect(() => {
    const videoRef = nextRef || internalRef;
    console.log(`VideoComponent Mounted - ID: ${id}`, videoRef.current);
  }, [nextRef]);

  const handleLoadedData = () => {
    console.log(`Video Loaded - ID: ${id}`);
    loadHandler();
  };

  return (
    <video
      ref={nextRef || internalRef}
      src={src}
      loop
      muted
      id={id}
      className={style}
      onLoadedData={handleLoadedData}
      playsInline
    />
  );
};

export default VideoComponent;