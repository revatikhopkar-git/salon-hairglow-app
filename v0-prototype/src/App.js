// App.js
import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import curlyDark from "./assets/curly_dark.png";
import longBrownCurly from "./assets/long_brown_curly.png";
import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const App = () => {
  const webcamRef = useRef(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [smoothPos, setSmoothPos] = useState(null);

  const styles = [
    { name: "Curly Dark", img: curlyDark },
    { name: "Long Brown Curly", img: longBrownCurly },
  ];

  const smooth = (prev, next, factor = 0.25) => {
    if (!prev) return next;
    return {
      top: prev.top + (next.top - prev.top) * factor,
      left: prev.left + (next.left - prev.left) * factor,
      width: prev.width + (next.width - prev.width) * factor,
      height: prev.height + (next.height - prev.height) * factor,
    };
  };

  const onResults = (results) => {
    if (
      results.multiFaceLandmarks &&
      results.multiFaceLandmarks.length > 0 &&
      webcamRef.current &&
      webcamRef.current.video
    ) {
      const landmarks = results.multiFaceLandmarks[0];
      const video = webcamRef.current.video;
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      const forehead = landmarks[10];
      const chin = landmarks[152];
      const leftEar = landmarks[234];
      const rightEar = landmarks[454];

      const faceWidth = Math.abs(rightEar.x - leftEar.x) * videoWidth;
      const faceHeight = Math.abs(chin.y - forehead.y) * videoHeight;

      const centerX = ((leftEar.x + rightEar.x) / 2) * videoWidth;
      const centerY = ((forehead.y + chin.y) / 2) * videoHeight;

      const styleWidth = faceWidth * 1.75;
      const styleHeight = faceHeight * 2.25;

      const newPos = {
        top: centerY - styleHeight * 0.6,
        left: centerX - styleWidth / 2,
        width: styleWidth,
        height: styleHeight,
      };

      setSmoothPos((prev) => smooth(prev, newPos));
    }
  };

  useEffect(() => {
    if (!webcamRef.current) return;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });
    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    faceMesh.onResults(onResults);

    const video = webcamRef.current.video;
    const interval = setInterval(() => {
      if (video && video.readyState === 4) {
        clearInterval(interval);
        const camera = new Camera(video, {
          onFrame: async () => {
            await faceMesh.send({ image: video });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-4">
      <div className="relative w-full max-w-screen-md aspect-video overflow-hidden">
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          mirrored
          className="w-full h-full object-cover rounded-xl absolute top-0 left-0 z-0"
        />
        {selectedStyle && smoothPos && (
          <img
            src={selectedStyle}
            alt="Hairstyle overlay"
            className="absolute pointer-events-none z-10 animate-fadeIn"
            style={{
              top: `${smoothPos.top}px`,
              left: `${smoothPos.left}px`,
              width: `${smoothPos.width}px`,
              height: `${smoothPos.height}px`,
              filter:
                "drop-shadow(0 6px 10px rgba(0,0,0,0.3)) brightness(1.08) contrast(0.92)",
              mixBlendMode: "multiply",
              opacity: 0.95,
              borderRadius: "6px",
              position: "absolute",
              transition:
                "top 0.2s ease, left 0.2s ease, width 0.2s ease, height 0.2s ease, opacity 0.3s ease",
            }}
          />
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center w-full max-w-md">
        {styles.map((style, index) => (
          <button
            key={index}
            onClick={() => setSelectedStyle(style.img)}
            className="flex-1 min-w-[100px] px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 shadow transition duration-200 text-sm"
          >
            {style.name}
          </button>
        ))}
        <button
          onClick={() => setSelectedStyle(null)}
          className="flex-1 min-w-[100px] px-3 py-2 rounded-xl bg-red-100 hover:bg-red-200 shadow transition duration-200 text-sm"
        >
          Remove Style
        </button>
      </div>
    </div>
  );
};

export default App;
