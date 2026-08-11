import React, { useState, useEffect, useRef } from 'react'
import { songService } from '../service/api'

import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";
import { CiCircleList } from "react-icons/ci";
import { GoHeartFill } from "react-icons/go";
import { GoHeart } from "react-icons/go";

const Playlists = () => {

  const [existingPlaylist, setExistingPlaylists] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    const fetchPlaylists = async() =>{
      try {
        setLoading(true);
        const response = await songService.getPlaylists();

        if(response.data && response.data.success){
          setExistingPlaylists(response.data.data)
        };

        console.log("Playlists: ", response.data.data);
        
      } catch (err) {
        console.log(err);
        setError("Could not connect to the music server.")
      }finally{
        setLoading(false);
      }
    }
    fetchPlaylists();
  }, [])
  


  return (
    <>
       <section className='relative w-full h-full shrink-0 flex py-3 md:p-5 items-center justify-center flex-col md:flex-row gap-3 md:gap-8'>
          
          <div className='border md:mt-0 -mt-15 rounded-tl-none rounded-tr-none flex md:rounded-2xl w-full h-full shrink-0 flex-col items-center justify-around pt-5 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)] border-white/20 bg-white/10 backdrop-blur-md'>
          
              <ul className='w-full h-full overflow-x-auto overflow-y-hidden scrollbar-none flex items-center p-6 pl-10 gap-8'>

                {existingPlaylist.map((playlist)=>{

                  return(
                    <li
                      key={playlist.id} 
                      className='w-[25%] h-full p-5 border-2 rounded-2xl border-white/40 flex flex-col items-center justify-center gap-4 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)] shrink-0'>
                      {/*  Playlist Cover Image */}
                      <div className='w-full h-[50%] border rounded-3xl text-white/20'>

                      </div>

                      <h1 className='text-2xl w-full h-fit flex items-center justify-center p-2 font-semibold text-white'>
                        {playlist.name}
                      </h1>

                      <div className='h-fit p-2 w-full flex items-center justify-around text-white'>
                        <button> <GoHeart size={35} className='cursor-pointer transition-all duration-300 hover:text-white/45' /> </button>
                        <button> <CiPlay1 size={35} className='cursor-pointer transition-all duration-300 hover:text-white/45' /> </button>
                        <button> <CiCircleList size={35} className='cursor-pointer transition-all duration-300 hover:text-white/45' /> </button>
                      </div>
                    </li>
                  )
                })
                }
                
              </ul>

          </div>              
       
          {/* <button className='z-30 w-fit h-fit px-4 py-2 border rounded-2xl font-semibold absolute -bottom-1 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)] border-white/20 bg-white/10 backdrop-blur-md'>create new playlist</button> */}
       </section>
    </>
  )
}

export default Playlists