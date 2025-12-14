import React from 'react'
import { Link } from 'react-router-dom'
const Gif = ({gif,hover=true}) => {
    console.log(gif);
  return (
   <Link to={`/${gif.type}s/${gif.slug}`}>
    <div className='border border-gray-700 cursor-pointer w-full mb-2 relative group aspect-video'>
        <img 
        src={gif?.images?.fixed_width_downsampled?.url} 
        alt={gif?.title} 
        className={`w-full h-auto rounded`}
        />
        {
            hover && (
                <div className=' absolute top-0 left-0 w-full h-full bg-gifs-custom  bg-opacity-100 opacity-0 group-hover:opacity-100 flex  justify-center items-end  p-2 rounded '>
                <div className='flex justify-center items-center'>
                
                <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className='w-5 h-5 mb-2'
                />
                <span className='ml-2'>{gif?.user?.display_name}</span>
                </div>
            </div>
            )
        }
    </div>
   </Link>
   
  )
}

export default Gif