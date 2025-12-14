import Navbar from '../components/Navbar'
import SearchGifs from '../components/SearchGifs'
import Gif from '../components/Gif'
import {GifState} from "../context/GifContext"
import { useParams } from 'react-router-dom'
import {  useState, useEffect } from 'react'
import FollowOn from '../components/FollowOn'

const contentType = ['gifs','stickers','text']

const GifPage = () => {

   const [gifDetail,setGifDetail] = useState([])
    const [relatedGifs,setRelatedGifs] = useState([])
  const {gf} = GifState()
  const {type,slug} = useParams()
 
  console.log(gifDetail)
  const fetchGifDetail = async () => {
    const gifId = slug.split("-")
    const {data} = await gf.gif(gifId[gifId.length - 1])
    const {data:relatedData} = await gf.related(gifId[gifId.length - 1],{limit:20})
    
    setGifDetail(data)
    setRelatedGifs(relatedData)
  }
  useEffect(() => {
    if (contentType.includes(type)) {
      fetchGifDetail()
    }
    else{
      throw new Error("Invalid content type")
    }
  }, [type,slug])

  return (
     <section className=' pt-5 pb-10 flex justify-center  w-full h-full min-h-screen  bg-gray-950  text-white'>
        <div className=' w-full px-4 lg:max-w-7xl '>

       
        <Navbar />
          {/*Search Gifs*/}
           <SearchGifs />
           
        <div className='h-180 w-full '>
         <div className=' flex  flex-col gap-5 md:flex-row' data-name="gif-container">
          <div>
             <h1>creator data</h1>
             {/*creator of the gif details*/}
             

             <FollowOn />
          </div>
          <div>
             <h1>{gifDetail.title}</h1>
              <Gif gif={gifDetail} hover={false} />
          </div>
          <div>
             <h1>share</h1>
          </div>
         </div>
        </div>
 </div>
    </section>
  )
}

export default GifPage