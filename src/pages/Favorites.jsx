import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Gif from '../components/Gif'
import { GifState } from '../context/GifContext'

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
    <div className='flex flex-col w-full min-h-screen bg-gray-950 text-white'>
      <Navbar />
      <div className='w-full px-4 lg:max-w-7xl mx-auto mt-5 pb-10'>
        <h1 className='text-2xl font-bold mb-6'>My Favorites</h1>
        {favoriteGifs.length > 0 ? (
          <div className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'>
            {favoriteGifs.map((gif) => (
              <Gif key={gif.id} gif={gif} />
            ))}
          </div>
        ) : (
          <div className='flex flex-col justify-center items-center h-[50vh]'>
            <h2 className='text-xl text-gray-400'>No Favorite GIFs yet</h2>
            <p className='text-gray-500 mt-2'>Start exploring and heart some GIFs!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites