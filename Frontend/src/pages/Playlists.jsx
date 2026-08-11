import React, { useState, useEffect, useRef } from 'react'
import { songService } from '../service/api'



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
       <section className='w-full h-full shrink-0 flex py-3 md:p-5 items-center justify-center flex-col md:flex-row gap-3 md:gap-8 '>
          
          <div className='border md:mt-0 -mt-15 rounded-tl-none rounded-tr-none flex md:rounded-2xl w-full h-full shrink-0 flex-col items-center justify-around pt-5 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)] border-white/20 bg-white/10 backdrop-blur-md'>
          
              <ul className='w-full h-full overflow-x-hidden overflow-y-auto scrollbar-none flex flex-col items-center pt-10 gap-5'>

                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white/50 shrink-0 flex items-center justify-start p-3 pl-10'>
                  <div className='h-[90%] md:w-50 w-30 border border-white/50 rounded-xl'>

                  </div>
                </li>

              </ul>

          </div>              
       
       </section>
    </>
  )
}

export default Playlists