"use client";
import React, { useEffect } from "react";

const VideoComponent = ({ nextRef, src, id, style, loadHandler }) => {
  useEffect(() => {
    console.log(`Mounted video: ${id} (${src})`);
  }, []);

  const handleCanPlayThrough = () => {
    console.log(`Ready to play: ${id}`);
    loadHandler();
  };

  const handleError = (e) => {
    console.error(`Error in ${id}:`, e);
  };

  return (
    <video
      ref={nextRef}
      src={src}
      loop
      muted
      id={id}
      className={style}
      onLoadedData={handleCanPlayThrough}
      onError={handleError}
      playsInline
      preload="auto"
    />
  );
};

export default VideoComponent;