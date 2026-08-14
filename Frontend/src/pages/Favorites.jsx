import React, { useState, useEffect, useRef } from 'react'
import { songService } from '../service/api'
import { BsFileEarmarkMusic } from 'react-icons/bs'

const Favorites = () => {

  const [favoriteSongsList, setFavoriteSongsList ] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
  const fetchLikedSongs = async() =>{
    try {
      setLoading(true);
      const response = await songService.getLikedSongs();

      if(response.data && response.data.success){
        setFavoriteSongsList(response.data.data);
        console.log((await response).data.data);
        
      }

    } catch (err) {
      console.error("Error fetching tracks from server: ", err);
      setError("Could not connect to the music server.");

    }finally{
      setLoading(false);

    }
  }
    fetchLikedSongs();
  }, [])
  

  return (
    <>
        <section className='w-full h-full shrink-0 flex py-3 md:p-5 items-center justify-center flex-col md:flex-row gap-3 md:gap-8'>
          <div className='border hidden md:flex border-white/20 bg-white/10 backdrop-blur-md rounded-2xl w-full h-full shrink-0 flex-col items-center justify-around pt-5 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]'>
            <ul className='w-full h-full md:border -mt-12 md:mt-0 border-0 border-white/20 bg-white/10 backdrop-blur-md rounded-2xl overflow-x-hidden overflow-y-auto scrollbar-none pt-5 px-2 flex flex-col items-center shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]'>
            
            {
              favoriteSongsList.map((song)=>{
                return(
                  <li 
                    key={song.id}
                    className='border-b mt-1 w-full h-18 shrink-0 flex items-center p-1 md:p-3 text-white gap-2 md:gap-4'
                  >
                    <div className='border rounded-xl h-13 w-13 flex items-center justify-center shrink-0'>
                      {/* <BsFileEarmarkMusic className="w-[80%] h-[80%] text-sm" /> */}
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
          </div>
        </section>
    </>
  )
}

export default Favorites