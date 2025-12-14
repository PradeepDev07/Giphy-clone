import { useState,useEffect } from "react"
import FilterGifs from "../components/FilterGifs"
import Navbar from "../components/Navbar"
import SearchGifs from "../components/SearchGifs"
import {GifState} from "../context/GifContext"
import { useParams } from "react-router-dom"
import Gif from "../components/Gif"
import FollowOn from "../components/FollowOn"

const Category = () => {
  const [result, setResult] = useState([])
  const {category} = useParams()
  const {gf} = GifState()

  const fetchGIFsByCategory = async () => {
      const {data} = await gf.gifs(category,category)
      setResult(data)
      
  }

 useEffect(() => {
    fetchGIFsByCategory()
  }, [category])

  return (
     <section className=' pt-5 pb-10 flex justify-center  w-full h-full min-h-screen  bg-gray-950  text-white'>
        <div className=' w-full px-4 lg:max-w-7xl '>       
        <Navbar />
          {/*Search Gifs*/}
           <SearchGifs />
        <div>

           <h1 className='text-3xl font-bold mb-4'></h1>

           

            {/*Rendering GIFs*/}
            <div className="flex flex-col md:flex-row  my-4 gap-5">
            <div className="w-full md:w-1/3 ">
              {result[0] && <Gif gif={result[0]} hover={false} />}

              <span className="text-sm text-gray-400">Don&apos;t tell it to me , GIF it to me!</span>
              <FollowOn />
              <hr className="opacity-50 my-5"/>
            </div>
            <div>
           <h1 className="text-2xl  capitalize sm:text-3xl md:text-4xl font-extrabold pb-4">@{category}</h1>

           
            <div className='columns-2 sm:columns-3 md:columns-3 lg:columns-4 xl:columns-5 gap-2 mt-4 '> 
               {
                  result.slice(1).map(
                    (gif)=> <Gif key={gif.title} gif={gif} />
                    
                  )
                }
            </div>
             </div>
               </div>
            
        </div>
 </div>
    </section>
  )
}

export default Category