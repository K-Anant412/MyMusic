import React, { useState, useEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import { songService } from '../service/api'
import Navbar from '../components/Navbar'

const Home = () => {

  // const [songList, setSongList] = useState([])
  // const [loading, setLoading] = useState(false)
  // const [error, setError] = useState(null)

  // useEffect(() => {
  //   const fetchSongs = async() =>{
  //     try {
  //       setLoading(true);

  //       const response = await songService.getSongs();

  //       if( response.data && response.data.success ){
  //         setSongList(response.data.data);
  //         console.log("Fetched SOngs: ",response.data.data);
  //       }

  //     } catch (err) {

  //       console.error("Error fetching tracks from server: ", err);
  //       setError("Could not connect to the music server.")

  //     }finally{
  //       setLoading(false);
  //     }
  //   }
  //   fetchSongs();
  // }, [])
  

  return (
    <>
        <section className='w-full h-full p-3 md:p-10 bg-linear-to-t md:bg-linear-to-l from-[#F8B2B2] via-[#AF719D] to-[#8B639B] flex items-center justify-center'>
            
            <div className='border md:w-[90%] md:h-[90%] h-full w-full md:rounded-3xl md:p-0 flex flex-col overflow-hidden'>
              <Navbar />
              
              {/* display section */}
              <div className="flex-1 overflow-auto">
                  <Outlet />
              </div>

            </div>

        </section>
    </>
  )
}

export default Home