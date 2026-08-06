import React from 'react'

const Songs = () => {
  return (
    <>
        <section className='w-full h-full shrink-0 flex py-3 md:p-5 items-center justify-center flex-col md:flex-row gap-3 md:gap-8'>
          
          <div className='border hidden md:block rounded-2xl w-[30%] h-full shrink-0'>

          </div>

          <div className='md:border border-0 rounded-2xl h-full w-full overflow-x-hidden overflow-y-auto scrollbar-none pt-5 px-2 flex flex-col items-center gap-3'>
            
            
            <div className='border rounded-sm w-full h-15 shrink-0'></div>
            

          </div>

        </section>
    </>
  )
}

export default Songs