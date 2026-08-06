import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'


import Navbar from './components/Navbar'
import Home from './pages/Home'
import Songs from './pages/Songs'
import Playlists from './pages/Playlists'
import Albums from './pages/Albums'
import Favorites from './pages/Favorites'
import Controller from './pages/Controller'


import './App.css'

function App() {

  return (
    <>
      <section className='w-screen h-screen overflow-hidden flex items-center justify-center'>
        
        <Routes>
            <Route path="/" element={<Home />}>
                <Route index element={<Songs />} />
                <Route path="songs" element={<Songs />} />
                <Route path="playlists" element={<Playlists />} />
                <Route path="albums" element={<Albums />} />
                <Route path="favorites" element={<Favorites />} />
            </Route>

            <Route path="/controller" element={<Controller />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

      </section>
    </>
  )
}

export default App
