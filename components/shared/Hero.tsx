'use client'

import { useEffect, useRef } from "react";
import { useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { ArrowRightIcon, CalendarIcon, SearchIcon } from "lucide-react";
import SearchSection from "./searchSection";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadedVideos, setLoadedVideos] = useState(0);
  const [textColor, setTextColor] = useState('blue');
  const [packageType, setPackageType] = useState('City Explorer');
  const [duration, setDuration] = useState('3 Days');
  const [activeTab, setActiveTab] = useState('packages');
  const [autoPlayTimer, setAutoPlayTimer] = useState<NodeJS.Timeout | null>(null);

  const totalVideos = 3;
  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const mainVideoRef = useRef<HTMLVideoElement>(null);
  
  // Auto-change video every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = (prevIndex % totalVideos) + 1;
        
        // Change theme and text when video changes - set to green for second video, gray for third video
        if (nextIndex === 2) {
          setTextColor('green');
          setPackageType('Nature Escape');
          setDuration('5 Days');
        } else if (nextIndex === 3) {
          setTextColor('gray');
          setPackageType('Tea Garden Retreat');
          setDuration('7 Days');
        } else {
          setTextColor('blue');
          setPackageType('City Explorer');
          setDuration('3 Days');
        }
        
        return nextIndex;
      });
    }, 3000);
    
    // Clear interval on component unmount
    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
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
    <div className="relative w-screen overflow-x-hidden overflow-y-hidden h-screen sm:h-[80vh] md:h-screen">
      <div
        id="video-frame"
        className="relative z-10 rounded-lg h-1/2 bg-blue-75"
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
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
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
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 object-cover object-center w-full h-full"
            onLoadedData={handleVideoLoad}
          />
        </div>
        
        <div className="absolute top-1/2 left-0 z-40 w-full">
          <div className="px-5 sm:px-10">
            <h1 className={`${textColor === 'green' ? 'text-green-300' : textColor === 'gray' ? 'text-gray-200' : 'text-blue-200'} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight mb-2 sm:mb-3`}>
             Welcome to Traveling!
            </h1>
            <h1 className={`mb-2 sm:mb-3 ${textColor === 'green' ? 'text-green-100' : textColor === 'gray' ? 'text-gray-200' : 'text-blue-100'} text-base sm:text-lg md:text-xl lg:text-2xl max-w-full sm:max-w-[640px] font-semibold`}>
              Find Flights, Hotels, Visa & Holidays Packages
            </h1>
            {/* nothing to do  */}
            
          </div>
        </div>
        
      </div>
      {/* search section  */}
      <SearchSection/>

      {/* comment out trip type selectors */}
      
      
      {/* comment out trip type selectors */}
    </div>
  );
};

export default Hero;