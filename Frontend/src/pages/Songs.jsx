import { useState, useEffect } from "react"
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
const Songs = () => {

  const [songList, setSongList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const [currentSong, setCurrentSong] = useState(null)

  useEffect(() => {
    const fetchSongs = async() =>{
      try {
        setLoading(true);

        const response = await songService.getSongs();

        if( response.data && response.data.success ){
          setSongList(response.data.data);
          console.log("Fetched SOngs: ",response.data.data);
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

  return (
    <>
        <section className='w-full h-full shrink-0 flex py-3 md:p-5 items-center justify-center flex-col md:flex-row gap-3 md:gap-8'>
          
          <div className='border hidden md:flex border-white rounded-2xl w-[30%] h-full shrink-0 flex-col items-center justify-around pt-5 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]'>

              <div className="border w-[65%] h-[48%] rounded-xl shrink-0 border-white shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]">

              </div>

                <h1 className="w-[65%] truncate text-[18px] font-semibold text-white">{currentSong?currentSong.title : "Select song"}</h1>

                <div className="w-full h-fit flex items-center justify-center gap-3">
                  <button className="text-white text-3xl">
                    <MdOutlineReplay10/>
                  </button>

                  <input type="range" className="w-[65%] mt-2" />

                  <button className="text-white text-3xl">
                    <MdOutlineForward10/>
                  </button>
                </div>


              <div className="border-none w-full h-25 flex items-center justify-center gap-6">

                  <button className="w-fit h-fir text-2xl mt-1 text-white">
                    <SlLoop/>
                  </button>

                  <div className="shrink-0 w-fit h-full flex items-center justify-around gap-12">
                    <button className="text-white text-4xl cursor-pointer">
                      <GrPrevious />
                    </button>
                    <button className="text-white text-4xl cursor-pointer">
                      <CiPause1 />
                    </button>
                    <button className="text-white text-4xl cursor-pointer">
                      <GrNext />
                    </button>
                  </div>

                  <button className="w-fit h-fir text-3xl mt-1 text-white">
                    <MdQueueMusic/>
                  </button>

              </div>

          </div>

          <ul className='md:border -mt-12 md:mt-0 border-0 border-white rounded-2xl h-full w-full overflow-x-hidden overflow-y-auto scrollbar-none pt-5 px-2 flex flex-col items-center shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]'>
            
            {
              songList.map((song)=>{
                return(
                  <li 
                    key={song.song_id}
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