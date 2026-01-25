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
      <div className="">
        <div className="bg-white rounded-lg shadow-xl p-2 sm:p-3 max-w-6xl mx-auto -mt-8 sm:-mt-12 relative z-20">
  {/* Trip Type Selectors */}
  <div className="flex flex-wrap gap-2 mb-4">
    <div className="flex items-center min-w-[150px]">
      <input 
        type="radio" 
        id="trip-packages" 
        name="type" 
        value="packages" 
        defaultChecked 
        onChange={() => setActiveTab('packages')}
        className="hidden peer"
      />
      <label 
        htmlFor="trip-packages" 
        className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${textColor === 'green' ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800' : textColor === 'gray' ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800' : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800'} peer-checked:ring-2 ${textColor === 'green' ? 'peer-checked:ring-green-500' : textColor === 'gray' ? 'peer-checked:ring-gray-500' : 'peer-checked:ring-blue-500'} shadow-sm hover:shadow-md`}
      >
        Trip Packages
      </label>
      {activeTab === 'packages' && (
        <div className="relative">
          <select 
            id="packages-dropdown" 
            className={`ml-1 pl-3 pr-8 py-1 rounded-lg text-xs sm:text-sm border appearance-none ${textColor === 'green' ? 'border-green-200 bg-green-50' : textColor === 'gray' ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'} focus:outline-none focus:ring-2 ${textColor === 'green' ? 'focus:ring-green-300' : textColor === 'gray' ? 'focus:ring-gray-300' : 'focus:ring-blue-300'} transition-all duration-200`}
          >
            <option value="city-explorer">City Explorer</option>
            <option value="nature-escape">Nature Escape</option>
            <option value="tea-garden-retreat">Tea Garden Retreat</option>
            <option value="beach-vacation">Beach Vacation</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      )}
    </div>
    <div className="flex items-center min-w-[150px]">
      <input 
        type="radio" 
        id="flights" 
        name="type" 
        value="flights" 
        onChange={() => setActiveTab('flights')}
        className="hidden peer"
      />
      <label 
        htmlFor="flights" 
        className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${textColor === 'green' ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800' : textColor === 'gray' ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800' : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800'} peer-checked:ring-2 ${textColor === 'green' ? 'peer-checked:ring-green-500' : textColor === 'gray' ? 'peer-checked:ring-gray-500' : 'peer-checked:ring-blue-500'} shadow-sm hover:shadow-md`}
      >
        Flights
      </label>
      {activeTab === 'flights' && (
        <div className="relative">
          <select 
            id="flights-dropdown" 
            className={`ml-1 pl-3 pr-8 py-1 rounded-lg text-xs sm:text-sm border appearance-none ${textColor === 'green' ? 'border-green-200 bg-green-50' : textColor === 'gray' ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'} focus:outline-none focus:ring-2 ${textColor === 'green' ? 'focus:ring-green-300' : textColor === 'gray' ? 'focus:ring-gray-300' : 'focus:ring-blue-300'} transition-all duration-200`}
          >
            <option value="biman">Biman Bangladesh</option>
            <option value="novoair">Novoair</option>
            <option value="us-bangla">US-Bangla</option>
            <option value="regent">Regent Airways</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      )}
    </div>
    <div className="flex items-center min-w-[150px]">
      <input 
        type="radio" 
        id="hotels" 
        name="type" 
        value="hotels" 
        onChange={() => setActiveTab('hotels')}
        className="hidden peer"
      />
      <label 
        htmlFor="hotels" 
        className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${textColor === 'green' ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800' : textColor === 'gray' ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800' : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800'} peer-checked:ring-2 ${textColor === 'green' ? 'peer-checked:ring-green-500' : textColor === 'gray' ? 'peer-checked:ring-gray-500' : 'peer-checked:ring-blue-500'} shadow-sm hover:shadow-md`}
      >
        Hotels
      </label>
      {activeTab === 'hotels' && (
        <div className="relative">
          <select 
            id="hotels-dropdown" 
            className={`ml-1 pl-3 pr-8 py-1 rounded-lg text-xs sm:text-sm border appearance-none ${textColor === 'green' ? 'border-green-200 bg-green-50' : textColor === 'gray' ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'} focus:outline-none focus:ring-2 ${textColor === 'green' ? 'focus:ring-green-300' : textColor === 'gray' ? 'focus:ring-gray-300' : 'focus:ring-blue-300'} transition-all duration-200`}
          >
            <option value="pan-pacific">Pan Pacific</option>
            <option value="westin">The Westin</option>
            <option value="sheraton">Sheraton</option>
            <option value="marriott">Marriott</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      )}
    </div>
    <div className="flex items-center">
      <input 
        type="radio" 
        id="tours" 
        name="type" 
        value="tours" 
        onChange={() => setActiveTab('tours')}
        className="hidden peer"
      />
      <label 
        htmlFor="tours" 
        className={`px-3 py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-all duration-200 ${textColor === 'green' ? 'bg-gradient-to-r from-green-100 to-green-50 text-green-800' : textColor === 'gray' ? 'bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800' : 'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-800'} peer-checked:ring-2 ${textColor === 'green' ? 'peer-checked:ring-green-500' : textColor === 'gray' ? 'peer-checked:ring-gray-500' : 'peer-checked:ring-blue-500'} shadow-sm hover:shadow-md`}
      >
        Tours
      </label>
      {activeTab === 'tours' && (
        <div className="relative">
          <select 
            id="tours-dropdown" 
            className={`ml-1 pl-3 pr-8 py-1 rounded-lg text-xs sm:text-sm border appearance-none ${textColor === 'green' ? 'border-green-200 bg-green-50' : textColor === 'gray' ? 'border-gray-200 bg-gray-50' : 'border-blue-200 bg-blue-50'} focus:outline-none focus:ring-2 ${textColor === 'green' ? 'focus:ring-green-300' : textColor === 'gray' ? 'focus:ring-gray-300' : 'focus:ring-blue-300'} transition-all duration-200`}
          >
            <option value="sundarbans">Sundarbans Tour</option>
            <option value="sylhet">Sylhet Tour</option>
            <option value="coxs-bazar">Cox's Bazar Tour</option>
            <option value="bandarban">Bandarban Tour</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Main Search Grid */}
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 ${textColor === 'green' ? 'border-green-200' : textColor === 'gray' ? 'border-gray-200' : 'border-blue-100'} rounded-2xl p-2 ${textColor === 'green' ? 'bg-gradient-to-br from-white to-green-50' : textColor === 'gray' ? 'bg-gradient-to-br from-white to-gray-50' : 'bg-gradient-to-br from-white to-blue-50'} shadow-lg hover:shadow-2xl transition-all duration-500`}>
    <div className={`border-r ${textColor === 'green' ? 'border-green-200' : textColor === 'gray' ? 'border-gray-200' : 'border-blue-100'} p-2 group hover:${textColor === 'green' ? 'bg-green-50' : textColor === 'gray' ? 'bg-gray-50' : 'bg-blue-50'} transition-all duration-300 rounded-lg hover:scale-[1.02]`}>
      <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Package Type</span>
      <div className="relative mt-1">
        <select className="w-full bg-transparent border-none outline-none cursor-pointer pl-3 pr-8 py-1 rounded-lg appearance-none">
          <option value="dhaka">City Explorer</option>
          <option value="sundorbon">Nature Escape</option>
          <option value="shylet">Tea Garden</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="text-[8px] sm:text-[10px] text-gray-500 mt-1 opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Curated travel experiences
      </div>
    </div>
    
    <div className={`border-r ${textColor === 'green' ? 'border-green-200' : textColor === 'gray' ? 'border-gray-200' : 'border-blue-100'} p-2 group hover:${textColor === 'green' ? 'bg-green-50' : textColor === 'gray' ? 'bg-gray-50' : 'bg-blue-50'} transition-all duration-300 rounded-lg hover:scale-[1.02]`}>
      <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Duration</span>
      <div className="relative mt-1">
        <select className="w-full bg-transparent border-none outline-none cursor-pointer pl-3 pr-8 py-1 rounded-lg appearance-none">
          <option value="3">3 Days</option>
          <option value="5">5 Days</option>
          <option value="7">7 Days</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <div className="text-[8px] sm:text-[10px] text-gray-500 mt-1 opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Flexible trip lengths
      </div>
    </div>

    <div className={`border-r ${textColor === 'green' ? 'border-green-200' : textColor === 'gray' ? 'border-gray-200' : 'border-blue-100'} p-2 group hover:${textColor === 'green' ? 'bg-green-50' : textColor === 'gray' ? 'bg-gray-50' : 'bg-blue-50'} transition-all duration-300 rounded-lg hover:scale-[1.02]`}>
      <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Travel Date</span>
      <div className="relative mt-1">
        <input type="date" className="w-full bg-transparent border-none outline-none cursor-pointer pl-3 pr-8 py-1 rounded-lg appearance-none" />
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
          <CalendarIcon className="h-4 w-4" />
        </div>
      </div>
      <div className="text-[8px] sm:text-[10px] text-gray-500 mt-1 opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Select your travel dates
      </div>
    </div>

    <div className={`p-2 group hover:${textColor === 'green' ? 'bg-green-50' : textColor === 'gray' ? 'bg-gray-50' : 'bg-blue-50'} transition-all duration-300 rounded-lg hover:scale-[1.02]`}>
      <div className="mb-2">
        <span className="text-[8px] sm:text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Passengers</span>
        <div className="relative mt-1">
          <select className="w-full bg-transparent border-none outline-none cursor-pointer pl-3 pr-8 py-1 rounded-lg appearance-none">
            <option value="1">1 Person</option>
            <option value="2">2 People</option>
            <option value="3">3 People</option>
            <option value="4+">4+ People</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="text-[8px] sm:text-[10px] text-gray-500 mt-1 opacity-0 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Number of travelers
      </div>
      </div>
      <button 
        onClick={() => window.location.href = '/sign-in'}
        className={`bg-gradient-to-r ${textColor === 'green' ? 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700' : textColor === 'gray' ? 'from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700' : 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'} p-2 rounded-md text-white w-full transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 group cursor-pointer`}>
        <SearchIcon className="w-3 h-3 animate-pulse group-hover:animate-bounce" />
        <span className="font-semibold text-xs">{textColor === 'green' ? 'Book Tour' : textColor === 'gray' ? 'Book Exp' : 'Book Flight'}</span>
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