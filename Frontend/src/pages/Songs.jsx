import { useState, useEffect, useRef } from "react"
import { songService } from '../service/api'
import React from 'react'

import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { CiCircleList } from "react-icons/ci";
import { MdQueueMusic } from "react-icons/md";
import { SlLoop } from "react-icons/sl";
import { MdOutlineReplay10 } from "react-icons/md";
import { MdOutlineForward10 } from "react-icons/md";
import { BsFileEarmarkMusic } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";


const Songs = () => {

  const [songList, setSongList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const songPath = useRef(null)

  useEffect(() => {
    const fetchSongs = async() =>{
      try {
        setLoading(true);

        const response = await songService.getSongs();

        if( response.data && response.data.success ){
          setSongList(response.data.data);
        }

      } catch (err) {

        console.error("Error fetching tracks from server: ", err);
        setError("Could not connect to the music server.")

      }finally{
        setLoading(false);
      }
    }
    fetchSongs();
  }, [])

  useEffect(() => {
    if (!currentSong || !songPath.current) return;

    songPath.current.load();

    songPath.current.play()
      .then(()=>{
        setIsPlaying(true);
      })
      .catch((error) => {
        console.log("error in playing: ", error);
        setIsPlaying(false);
      });
  }, [currentSong])
  
  const togglePlay = () => {
    if (!songPath.current || !currentSong) return;

    if (songPath.current.paused) {
      songPath.current.play();
      setIsPlaying(true);
    } else {
      songPath.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    if (!songPath.current) return;

      setCurrentTime(songPath.current.currentTime);
  };

  const handleLoadedMetadata = () => {
      if (!songPath.current) return;

      setDuration(songPath.current.duration);
  };

  const rewind10 = () =>{
    if(!songPath.current) return;

    songPath.current.currentTime = Math.max(
      0,
      songPath.current.currentTime - 10
    );
  };

  const forward10 = ()=>{
    if(!songPath.current) return;

    songPath.current.currentTime = Math.min(
      duration,
      songPath.current.currentTime + 10
    );
  };

  const playNext = () =>{
    if(!songPath || songList === 0) return;

    const currentIndex = songList.findIndex(
      song => song.id === currentSong.id
    );

    const nextIndex = (currentIndex + 1) % songList.length;

    setCurrentSong(songList[nextIndex]);
  };

  const playPrevious = () =>{
    if(!songPath || songList.length === 0) return;

    const currentIndex = songList.findIndex(
      song => song.id === currentSong.id
    );

    const previousIndex = ( currentIndex - 1 + songList.length) % songList.length;
  
    setCurrentSong(songList[previousIndex]);
  };

  const handleSongEnded = () => {
  if (isLooping) return;

  playNext();
  };

  const toggleLoop = () =>{
    setIsLooping(prev => !prev);
  };

  const likeSong = async() =>{
    if( !currentSong ) return;

    const newFavorite = !currentSong.is_favorite;

    setIsFavorite(newFavorite);

    try {
      await songService.updateSong(currentSong.id, {is_favorite: newFavorite})
      setCurrentSong(prev => ({
      ...prev,
      is_favorite: newFavoriteStatus
    }));
    } catch (err) {
      console.error("Failed to update favorite:", err);
      setIsFavorite(!newFavoriteStatus);
    }
  }
  useEffect(() => {
    if(currentSong){
      setIsFavorite(currentSong.is_favorite);
    }
  }, [currentSong])
  
  return (
    <>
      <audio
        ref={songPath} 
        src={
          currentSong
            ? `/api/stream/${currentSong.id}/audio`
            : undefined
        }
        loop={isLooping}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleSongEnded}
      />
        <section className='w-full h-full shrink-0 flex py-3 md:p-5 items-center justify-center flex-col md:flex-row gap-3 md:gap-8'>
          
          <div className='border hidden md:flex border-white/20 bg-white/10 backdrop-blur-md rounded-2xl w-[30%] h-full shrink-0 flex-col items-center justify-around pt-5 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]'>

              <div className="border w-[65%] h-[48%] rounded-xl shrink-0 border-white/40 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]">

              </div>

                <h1 className="w-[65%] truncate text-[18px] font-semibold text-white">{currentSong?currentSong.title : "Select song"}</h1>

                <div className="w-full h-fit flex items-center justify-center gap-3">
                  <button 
                    onClick={rewind10}
                    className="text-white text-3xl">
                    <MdOutlineReplay10/>
                  </button>

                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={(e) => {
                      const time = Number(e.target.value);

                      songPath.current.currentTime = time;
                      setCurrentTime(time);
                    }}
                    className="w-[65%] mt-2"
                  />

                  <button 
                    onClick={forward10}
                    className="text-white text-3xl">
                    <MdOutlineForward10/>
                  </button>
                </div>


              <div className="border-none w-full h-25 flex items-center justify-center gap-6">

                  <button
                    onClick={toggleLoop}
                    className={`w-fit h-fit text-2xl mt-1 cursor-pointer ${
                      isLooping ? "text-blue-400" : "text-white"
                    }`}
                  >
                    <SlLoop />
                  </button>

                  <div className="shrink-0 w-fit h-full flex items-center justify-around gap-12">
                    <button 
                      onClick={playPrevious}
                      className="text-white text-4xl cursor-pointer">
                      <GrPrevious />
                    </button>
                    <button 
                      onClick={togglePlay}
                      className="text-white text-4xl cursor-pointer"
                    >
                      {isPlaying ? <CiPause1 /> : <CiPlay1 />}
                    </button>
                    <button 
                      onClick={playNext}
                      className="text-white text-4xl cursor-pointer">
                      <GrNext />
                    </button>
                  </div>

                  <button className="w-fit h-fir text-3xl mt-1 text-white" onClick={likeSong}>
                    {isFavorite ? <IoMdHeart/> :<IoMdHeartEmpty/>}
                  </button>

              </div>

          </div>

          <ul className='md:border -mt-12 md:mt-0 border-0 border-white/20 bg-white/10 backdrop-blur-md rounded-2xl h-full w-full overflow-x-hidden overflow-y-auto scrollbar-none pt-5 px-2 flex flex-col items-center shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]'>
            
            {
              songList.map((song)=>{
                return(
                  <li 
                    key={song.id}
                    onClick={()=>setCurrentSong(song)}
                    className='border-b mt-1 w-full h-18 shrink-0 flex items-center p-1 md:p-3 text-white gap-2 md:gap-4'
                  >
                    <div className='border rounded-xl h-13 w-13 flex items-center justify-center shrink-0'>
                      <BsFileEarmarkMusic className="w-[80%] h-[80%] text-sm" />
                    </div>

                    <div className=' w-full h-fit flex flex-col gap-1 '>
                      <h2 className="text-xl md:text-[22px] font-semibold truncate">{song.title}</h2>
                      <h2 className="text-sm md:text-[16px] font-semibold truncate">{song.artist}</h2>
                    </div>

                    
                    {/* <IoMdHeartEmpty className="relative text-4xl cursor-pointer right-10" onClick={()=>console.log("Song liked")} /> */}

                  </li>
                );
              })
            }
            

          </ul>

        </section>
    </>
  )
}

export default Songs