import { useState, useEffect } from "react"
import { songService } from '../service/api'
import React from 'react'

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
          
          <div className='border hidden md:flex border-white rounded-2xl w-[30%] h-full shrink-0 flex-col items-center justify-center'>

            <div className="border w-[65%] h-[48%] rounded-sm shrink-0">

            </div>

            <h1 className="w-[65%] truncate">{currentSong?currentSong.title : ""}</h1>

            <input type="range" className="w-[65%]" />

            <div className="border w-full h-10">

            </div>

          </div>

          <ul className='md:border border-0 border-white rounded-2xl h-full w-full overflow-x-hidden overflow-y-auto scrollbar-none pt-5 px-2 flex flex-col items-center'>
            
            {
              songList.map((song)=>{
                return(
                  <li 
                    key={song.song_id}
                    onClick={()=>setCurrentSong(song)}
                    className='border-b mt-1 w-full h-18 shrink-0 flex items-center p-1 md:p-3 text-white gap-2 md:gap-4'
                  >
                    <div className='border rounded-xl h-13 w-13 shrink-0'>
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