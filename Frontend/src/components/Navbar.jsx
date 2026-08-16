import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

import { CiMenuKebab } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";

const Navbar = () => {

    const [isMenu, setIsMenu] = useState(false)

  return (
    <>
        {/* <nav className='border w-full md:w-[97%] h-30 md:h-fit flex flex-col shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)] border-white rounded-2xl'> */}
        <nav className="border z-50 border-white/20 bg-white/10 backdrop-blur-md w-full md:w-[97%] h-30 md:h-fit flex flex-col shadow-lg rounded-2xl">


            <ul className='w-full h-fit flex items-center p-1 justify-around mt-2 text-white'>
                {/* <button className='w-fit h-fit p-1 border m-1 rounded-3xl'> <CiMenuKebab className='text-3xl cursor-pointer' /> </button> */}
                <div className="relative">
                    <button
                        onClick={() => setIsMenu(prev => !prev)}
                        className='w-fit h-fit p-1 border m-1 rounded-3xl'
                    >
                        <CiMenuKebab className='text-3xl cursor-pointer' />
                    </button>

                    {isMenu && (
                        <div className="absolute left-0 top-full mt-2 w-52 
                                        rounded-xl border border-white/20 
                                        bg-gray-900/90 backdrop-blur-md 
                                        shadow-lg z-50 p-2">

                            <button
                                onClick={() => {
                                    console.log("Create Playlist");
                                    setIsMenu(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg 
                                        text-white hover:bg-white/10"
                            >
                                Create New Playlist
                            </button>

                            <button
                                onClick={() => {
                                    console.log("Edit Playlist");
                                    setIsMenu(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg 
                                        text-white hover:bg-white/10"
                            >
                                Edit Playlist
                            </button>

                            <button
                                onClick={() => {
                                    console.log("Remove Playlist");
                                    setIsMenu(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg 
                                        text-white hover:bg-white/10"
                            >
                                Remove Playlist
                            </button>

                            <button
                                onClick={() => {
                                    console.log("Remove Song");
                                    setIsMenu(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-lg 
                                        text-white hover:bg-white/10"
                            >
                                Remove Song
                            </button>

                        </div>
                    )}
                </div>
                      <NavLink to='/songs' className='w-fit p-1 text-xl md:text-2xl font-semibold text-white'> Songs </NavLink>
                      <NavLink to='/playlists' className='w-fit p-1 text-xl md:text-2xl font-semibold text-white'> Playlists </NavLink>
                      <NavLink to='/albums' className='w-fit p-1 text-xl md:text-2xl font-semibold text-white'> Albums </NavLink>
                      <NavLink to='/favorites' className='md:block hidden w-fit p-1 text-xl md:text-2xl font-semibold text-white'> Favorites </NavLink>

                <button className='w-fit h-fit p-1 border m-1 rounded-3xl'> <FiSearch className='text-3xl'/> </button>
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