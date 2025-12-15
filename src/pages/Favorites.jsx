import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Gif from '../components/Gif'
import { GifState } from '../context/GifContext'
import SearchGifs from '../components/SearchGifs'

const Favorites = () => {
  const { gf, favorites } = GifState()
  const [favoriteGifs, setFavoriteGifs] = useState([])

  const fetchFavoriteGifs = async () => {
    if (favorites.length === 0) {
      setFavoriteGifs([])
      return
    }
    const { data } = await gf.gifs(favorites)
    setFavoriteGifs(data)
  }

  useEffect(() => {
    fetchFavoriteGifs()
  }, [favorites])

  return (
   <section className=' pt-5 pb-10 flex justify-center  w-full h-full min-h-screen  bg-gray-950  text-white'>
        <div className=' w-full px-4 lg:max-w-7xl '>
           <Navbar />
          {/*Search Gifs*/}
           <SearchGifs />

           <h2 className='text-2xl font-bold mt-6 mb-4'>My Favorites</h2>
           
           {favoriteGifs.length > 0 ? (
             <div className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 mt-4'>
               {favoriteGifs.map((gif) => (
                 <Gif key={gif.id} gif={gif} />
               ))}
             </div>
           ) : (
             <div className='text-gray-400 mt-10 text-center text-xl'>
                No favorites yet. Go heart some GIFs!
             </div>
           )}
 </div>
    </section>
  )
}

export default Favorites