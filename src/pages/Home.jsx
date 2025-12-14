import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { GifState } from '../context/GifContext'
import Gif from '../components/Gif'
import FilterGifs from '../components/FilterGifs'
import SearchGifs from '../components/SearchGifs'

const Home = () => {
  const {gf,gifs,setGifs,filter} = GifState()

  const gifsTrending= async ()=>{
    const {data} = await gf.trending(
      {
        limit:100,
        type:filter,
        rating:"g"
      }
    )
    setGifs(data)
  }

  useEffect(()=>{
    gifsTrending()
   
  },[filter])
   console.log(gifs)
  return (
    <section className=' pt-5 pb-10 flex justify-center  w-full h-full min-h-screen  bg-gray-950  text-white'>
        <div className=' w-full px-4 lg:max-w-7xl '>

       
        <Navbar />
          {/*Search Gifs*/}
           <SearchGifs />
        <img src="/banner.gif" alt="earth banner" className='w-full h-auto rounded mt-2 '/>
        <div>

        
           {/*Filter Option*/}
           <FilterGifs />

            {/*Rendering GIFs*/}
            <div className='columns-2 sm:columns-3 md:columns-4 lg:columns-5  gap-2 mt-4 '> 
                {
                  gifs.map(
                    (gif)=> <Gif key={gif.title} gif={gif} />
                    
                  )
                }

            </div>
        </div>
 </div>
    </section>
  )
}

export default Home