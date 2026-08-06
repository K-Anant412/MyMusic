import React from 'react'
import { NavLink } from 'react-router-dom'

import { CiMenuKebab } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {
  return (
    <>
        <nav className='border w-full md:w-[97%] h-30 md:h-fit flex flex-col shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)] border-white rounded-2xl'>

            <div className='shrink-0 hidden w-full h-12 md:flex items-center justify-between pt-3 px-3 text-white/70'>
                  <button className='w-fit h-fit p-1 border m-1 rounded-3xl'>
                    <CiMenuKebab className='text-3xl ' />
                  </button>
                  <button className='w-fit h-fit p-1 border m-1 rounded-3xl'>
                    <FiSearch className='text-3xl'/>
                  </button>
            </div>

            <ul className='w-full h-fit flex items-center p-1 justify-around mt-2'>

                  <NavLink to='/songs' className='w-fit p-1 text-xl md:text-2xl font-semibold text-white'>
                    Songs  
                  </NavLink>

                  <NavLink to='/playlists' className='w-fit p-1 text-xl md:text-2xl font-semibold text-white'>
                    Playlists 
                  </NavLink>

                  <NavLink to='/albums' className='w-fit p-1 text-xl md:text-2xl font-semibold text-white'>
                    Albums
                  </NavLink>

                  <NavLink to='/favorites' className='md:block hidden w-fit p-1 text-xl md:text-2xl font-semibold text-white'>
                    Favorites
                  </NavLink>

            </ul>

            <div className='w-full h-fit p-1 flex flex-col'>

                <div>

                </div>
                  
            </div>

        </nav>
    </>
  )
}

export default Navbar