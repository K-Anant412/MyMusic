import React from 'react'

const Playlists = () => {
  return (
    <>
       <section className='w-full h-full shrink-0 flex py-3 md:p-5 items-center justify-center flex-col md:flex-row gap-3 md:gap-8'>
          
          <div className='border md:mt-0 -mt-15 rounded-tl-none rounded-tr-none flex border-white md:rounded-2xl w-full h-full shrink-0 flex-col items-center justify-around pt-5 shadow-[6px_8px_20px_rgba(0,0,0,0.22),-8px_-8px_20px_rgba(255,255,255,0.12)]'>
          
              <ul className='w-full h-full  overflow-x-hidden overflow-y-auto scrollbar-none flex flex-col items-center pt-10 gap-5'>

                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white shrink-0'></li>
                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white shrink-0'></li>
                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white shrink-0'></li>
                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white shrink-0'></li>
                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white shrink-0'></li>
                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white shrink-0'></li>
                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white shrink-0'></li>
                <li className='w-[90%] md:h-50 h-40 border rounded-xl border-white shrink-0'></li>

              </ul>

          </div>              
       
       </section>
    </>
  )
}

export default Playlists