import React from 'react'

const Albums = () => {
  return (
    <>
        Albums
        {songs.map((song) => {
                const isSelected = currentSong?.id === song.id;
                return (
                  <li
                    key={song.id}
                    onClick={() => setCurrentSong(song)}
                    className={`w-full h-13 border rounded-2xl shrink-0 flex items-center gap-5 p-1 px-3 cursor-pointer transition-all ${
                      isSelected ? 'bg-white/20 border-white font-bold' : 'border-white/40 hover:bg-white/10'
                    }`}
                  >
                    <div className={`h-full w-11 border rounded-[50%] shrink-0 ${isSelected && isPlaying ? 'animate-spin [animation-duration:5s]' : ''}`}></div>
                    <h1 className='text-lg md:text-xl font-semibold w-full truncate'>{song.title}</h1>

                    <button 
                      className='h-full w-11 shrink-0 flex items-center justify-center'
                      onClick={(e) => {
                        e.stopPropagation(); 
                        console.log("Liked:", song.title);
                      }}
                    >
                      <CiHeart size={30} />
                    </button>
                  </li>
                );
              })}
    </>
  )
}

export default Albums