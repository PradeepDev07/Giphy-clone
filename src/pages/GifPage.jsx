import React from 'react'
import Navbar from '../components/Navbar'
import SearchGifs from '../components/SearchGifs'
import FilterGifs from '../components/FilterGifs'
import Gif from '../components/Gif'
import {GifState} from "../context/GifContext"

const GifPage = () => {
  return (
     <section className=' pt-5 pb-10 flex justify-center  w-full h-full min-h-screen  bg-gray-950  text-white'>
        <div className=' w-full px-4 lg:max-w-7xl '>

       
        <Navbar />
          {/*Search Gifs*/}
           <SearchGifs />

        <div>

        
           
        </div>
 </div>
    </section>
  )
}

export default GifPage