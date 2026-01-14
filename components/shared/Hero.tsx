'use client'

import { useEffect, useRef } from "react";
import { useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRightIcon, CalendarIcon, SearchIcon } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  const handleMiniVdClick = () => {
    setHasClicked(true);

    setCurrentIndex(upcomingVideoIndex);
  };

  useEffect(() => {
    // Try to play the main video with a slight delay to ensure it's rendered
    setTimeout(() => {
      if (mainVideoRef.current && mainVideoRef.current.paused) {
        mainVideoRef.current.play().catch(e => console.log("Auto-play prevented by browser: ", e));
      }
    }, 100);
    
    // Also try to play all videos that might be paused
    const allVideos = [mainVideoRef.current, nextVideoRef.current];
    allVideos.forEach(video => {
      if (video && video.paused) {
        video.play().catch(e => console.log("Video play error: ", e));
      }
    });
  }, []);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center left",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
                    if (nextVideoRef.current) {
                      nextVideoRef.current.play().catch(e => console.log("Animation play error: ", e));
                    }
                  }
        });
        gsap.from("#current-video", {
          transformOrigin: "center left",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut"
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%"
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center left",
        end: "bottom left",
        scrub: true
      }
    });
  });

  const getVideoSrc = (index: number) => {
    return `videos/hero-${index}.mp4`;
  };
  return (
    <div className="relative w-screen overflow-x-hidden overflow-y-hidden h-screen">
      <div
        id="video-frame"
        className="relative z-10  rounded-lg h-1/2 bg-blue-75"
      >
        <div>
          <div className="absolute z-50 overflow-hidden rounded-lg cursor-pointer mask-clip-path absolute-center ">
            {/* minivideo link start */}
            <div
              // onClick={handleMiniVdClick}
              className="transition-all duration-500 ease-in origin-left scale-50 opacity-0 hover:scale-100 hover:opacity-0"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                playsInline
                id="current-video"
                className="object-cover object-left origin-left scale-150 w-full h-full"
                onLoadedData={handleVideoLoad}
              />
            </div>
            {/* minivideo link End */}
          </div>

          <video
            ref={nextVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            playsInline
            id="next-video"
            className="absolute z-20 invisible object-cover object-center absolute-center w-full h-full"
            onLoadedData={handleVideoLoad}
          />

          <video
            ref={mainVideoRef}
            src={getVideoSrc(
              currentIndex === totalVideos - 1 ? 1 : currentIndex
            )}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 object-cover object-center w-full h-full"
            onLoadedData={handleVideoLoad}
          />
          <button
            onClick={handleMiniVdClick}
            className="absolute right-6 top-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 text-black  font-bold   z-[200] "
          >
            {/* add padding */}
            {/* <img
              src="img/arrow.png"
              alt="arrow"
              className="w-14  md:w-16 h-14 md:h-16 p-1 hover:w-16 hover:h-16   animate-[pulse_2s_infinite] "
            /> */}
          </button>
        </div>
        
        <div className="absolute top-1/2 left-0 z-40 ">
          <div className="px-5   sm:px-10">
            <h1 className="text-blue-200 text-6xl font-semibold  tracking-tight mb-5">
             Welcome to Traveling!
            </h1>
            <h1 className="mb-5 text-blue-100 text-2xl max-w-[640px] font-semibold">
              Find Flights, Hotels, Visa & Holidays Packages
            </h1>
            {/* nothing to do  */}
            
          </div>
        </div>
        
      </div>
      {/* search section  */}
      <div className="">
        <div className="bg-white rounded-lg shadow-xl p-3 max-w-6xl mx-auto -mt-12 relative z-20">
  {/* Trip Type Selectors */}
  <div className="flex gap-4 mb-1">
    <label><input type="radio" name="type" /> Round Trip</label>
  </div>

  {/* Main Search Grid */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-2 border border-blue-100 rounded-2xl p-2 bg-gradient-to-br from-white to-blue-50 shadow-lg hover:shadow-2xl transition-all duration-500">
    <div className="border-r border-blue-100 p-2 group hover:bg-blue-50 transition-all duration-300 rounded-lg hover:scale-[1.02]">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">From</span>
      <div className="font-bold text-base text-gray-800 mt-1 group-hover:text-blue-600 transition-colors duration-300">
        <span className="animate-fadeIn">Dhaka</span>
      </div>
      <div className="text-[10px] text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Hazrat Shahjalal Int.
      </div>
    </div>
    
    <div className="border-r border-blue-100 p-2 group hover:bg-blue-50 transition-all duration-300 rounded-lg hover:scale-[1.02]">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">To</span>
      <div className="font-bold text-base text-gray-800 mt-1 group-hover:text-blue-600 transition-colors duration-300">
        <span className="animate-fadeIn">Cox's Bazar</span>
      </div>
      <div className="text-[10px] text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        The Longest Sea Beach
      </div>
    </div>

    <div className="border-r border-blue-100 p-2 group hover:bg-blue-50 transition-all duration-300 rounded-lg hover:scale-[1.02]">
      <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Departure</span>
      <div className="font-bold text-base text-gray-800 mt-1 group-hover:text-blue-600 transition-colors duration-300">
        <div className="flex items-center">
          <CalendarIcon className="w-3 h-3 mr-2 text-blue-400" />
          <span className="animate-fadeIn">15 Jan '26</span>
        </div>
      </div>
      <div className="text-[10px] text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Monday • 8:30 AM
      </div>
    </div>

    <div className="p-2 group hover:bg-blue-50 transition-all duration-300 rounded-lg hover:scale-[1.02]">
      <div className="mb-2">
        <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Return</span>
        <div className="font-bold text-base text-gray-800 mt-1 group-hover:text-blue-600 transition-colors duration-300">
          <div className="flex items-center">
            <CalendarIcon className="w-3 h-3 mr-2 text-blue-400" />
            <span className="animate-fadeIn">17 Jan '26</span>
          </div>
        </div>
        <div className="text-[10px] text-gray-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Wednesday • 4:20 PM
        </div>
      </div>
      <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 p-2 rounded-md text-white w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group">
        <SearchIcon className="w-3 h-3 animate-pulse group-hover:animate-bounce" />
        <span className="font-semibold text-xs">Search Flights</span>
        <ArrowRightIcon className="w-2 h-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
      </button>
    </div>
</div>
</div>
      </div>
    </div>
  );
};

export default Hero;