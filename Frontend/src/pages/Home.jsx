import React, { useState, useEffect, useRef } from 'react'
import { songService } from '../service/api'

import { CiMenuKebab } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

const Home = () => {

  const [songList, setSongList] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
        <section className='w-full h-full p-3 md:p-10 bg-linear-to-t md:bg-linear-to-l from-[#F8B2B2] via-[#AF719D] to-[#8B639B] flex items-center justify-center'>
            
            <div className='border md:w-[90%] md:h-[90%] h-full w-full md:rounded-3xl md:p-6 flex felx-col'>
                
              <nav className='border w-full h-40 flex flex-col'>

                <div className='shrink-0 w-full h-12 flex items-center justify-between pt-3 px-3 text-white/70'>
                  <button className='w-fit h-fit p-1 border m-1 rounded-3xl'>
                    <CiMenuKebab className='text-3xl ' />
                  </button>
                  <button className='w-fit h-fit p-1 border m-1 rounded-3xl'>
                    <FiSearch className='text-3xl'/>
                  </button>
                </div>

                <ul className='w-full h-fit flex items-center p-1 justify-around mt-2'>

                  <li className='w-fit p-1 text-xl font-semibold text-white'>
                    <a href="#">Songs</a>  
                  </li>
                  <li className='w-fit p-1 text-xl font-semibold text-white'>
                    <a href="#">Playlists</a>  
                  </li>
                  <li className='w-fit p-1 text-xl font-semibold text-white'>
                    <a href="#">Albums</a>  
                  </li>

                </ul>

                <div className='w-full h-fit p-1 flex flex-col'>

                  <div>

                  </div>
                  
                </div>

              </nav>

            </div>

        </section>
    </>
  )
}

export default Home