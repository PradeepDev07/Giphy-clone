import Navbar from '../components/Navbar'
import SearchGifs from '../components/SearchGifs'
import Gif from '../components/Gif'
import {GifState} from "../context/GifContext"
import { useParams } from 'react-router-dom'
import {  useState, useEffect } from 'react'
import FollowOn from '../components/FollowOn'
import { FaCode, FaHeart, FaShare } from 'react-icons/fa'
import { HiOutlineExternalLink } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";

const contentType = ['gifs','stickers','text']

const GifPage = () => {

  const [gifDetail,setGifDetail] = useState({})
  const [relatedGifs,setRelatedGifs] = useState([])
  const [showMore,setShowMore] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [embedModalOpen, setEmbedModalOpen] = useState(false)

  const {gf, addToFavorites, favorites} = GifState()
  const {type,slug} = useParams()
 
  const fetchGifDetail = async () => {
    setIsLoading(true)
    try {
      const gifId = slug.split("-")
      const {data} = await gf.gif(gifId[gifId.length - 1])
      const {data:relatedData} = await gf.related(gifId[gifId.length - 1],{limit:20})
      
      setGifDetail(data)
      setRelatedGifs(relatedData)
    } catch (error) {
      console.error("Error fetching gif details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (contentType.includes(type)) {
      fetchGifDetail()
    }
    else{
      console.error("Invalid content type")
    }
    window.scrollTo(0, 0)
  }, [type,slug])

  const shareUrl = window.location.href
  const embedCode = `<iframe src="${gifDetail.embed_url}" width="480" height="270" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>`

  if (isLoading) {
    return (
      <div className='w-full h-screen bg-gray-950 flex justify-center items-center text-white'>
        {/* simple indicator */}
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  return (
     <section className='flex flex-col w-full min-h-screen bg-gray-950 text-white'>
        <Navbar />
        
        <div className='w-full px-4 lg:max-w-7xl mx-auto mt-5 pb-10'>
           <SearchGifs />
           
           <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mt-8'>
              
              {/* Left Sidebar: User Details & Actions */}
              <div className='md:col-span-1 space-y-6'>
                 
                 {/* User Info */}
                 {gifDetail.user && (
                   <div className='bg-gray-900 rounded-lg p-4 border border-gray-800'>
                      <div className='flex items-center gap-4 mb-4'>
                          <img src={gifDetail.user.avatar_url} alt={gifDetail.user.username} className='w-14 h-14 rounded-full object-cover'/>
                          <div className='overflow-hidden'>
                            <h2 className='text-lg font-bold truncate'>{gifDetail.user.display_name}</h2>
                            <p className='text-sm text-gray-400 truncate'>@{gifDetail.user.username}</p>
                          </div>
                      </div>
                      
                      <div className='text-sm text-gray-300 mb-4'>
                        {gifDetail.user.description && (
                          <>
                            <p>{showMore ? gifDetail.user.description : gifDetail.user.description.slice(0, 80) + (gifDetail.user.description.length > 80 ? '...' : '')}</p>
                            {gifDetail.user.description.length > 80 && (
                              <button className='text-blue-400 mt-1 hover:underline' onClick={()=>setShowMore(!showMore)}>
                                {showMore ? "Show Less" : "Read More"}
                              </button>
                            )}
                          </>
                        )}
                      </div>
                      
                      <FollowOn />
                   </div>
                 )}

                 {/* Action Buttons */}
                 <div className='bg-gray-900 rounded-lg p-4 border border-gray-800 space-y-4'>
                    <button 
                      onClick={() => addToFavorites(gifDetail.id)}
                      className={`flex items-center gap-3 w-full transition-colors font-semibold ${favorites.includes(gifDetail.id) ? "text-pink-500" : "text-gray-300 hover:text-white"}`}
                    >
                      <FaHeart size={20} className={`${favorites.includes(gifDetail.id) ? "text-pink-500" : "text-gray-500"}`}/>
                      Favorite
                    </button>
                    <button 
                      onClick={() => setShareModalOpen(true)}
                      className='flex items-center gap-3 w-full text-gray-300 hover:text-white transition-colors font-semibold'
                    >
                      <FaShare size={20} className='text-blue-500'/>
                      Share
                    </button>
                    <button 
                      onClick={() => setEmbedModalOpen(true)}
                      className='flex items-center gap-3 w-full text-gray-300 hover:text-white transition-colors font-semibold'
                    >
                      <FaCode size={20} className='text-green-500'/>
                      Embed
                    </button>
                 </div>

                 {/* Source/External Link if available */}
                 {gifDetail.source && (
                    <div className='text-sm text-gray-500 break-all'>
                        <span className='font-semibold text-gray-400 block mb-1'>Source:</span>
                        <a href={gifDetail.source} target="_blank" rel="noreferrer" className='flex items-center gap-1 hover:text-blue-400'>
                           <HiOutlineExternalLink /> {gifDetail.source}
                        </a>
                    </div>
                 )}
              </div>

              {/* Main Content: Gif & Related */}
              <div className='md:col-span-3'>
                  
                  {/* Main Gif */}
                  <div className='mb-8'>
                     <h1 className='text-2xl md:text-3xl font-bold mb-4 text-gray-100'>{gifDetail.title}</h1>
                     <div className='relative w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800'>
                        <img 
                          src={gifDetail.images?.original?.url} 
                          alt={gifDetail.title} 
                          className='w-full h-auto object-contain max-h-[600px] mx-auto'
                        />
                     </div>
                  </div>

                  {/* Related Gifs */}
                  <div className='mt-12'>
                     <h3 className='text-xl font-bold mb-6 text-gray-300'>Related GIFs</h3>
                     <div className='columns-2 md:columns-3 gap-4 space-y-4'>
                        {relatedGifs.map((gif) => (
                           <Gif key={gif.id} gif={gif} />
                        ))}
                     </div>
                  </div>

              </div>

           </div>
        </div>

        {/* Share Modal */}
        {shareModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-4">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Share GIF</h3>
                    <button onClick={() => setShareModalOpen(false)} className="text-gray-400 hover:text-white"><IoMdClose size={24}/></button>
                </div>
                <div className="flex gap-2">
                    <input type="text" value={shareUrl} readOnly className="w-full bg-gray-800 p-2 rounded text-gray-300 border border-gray-700 focus:outline-none" />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(shareUrl)
                        alert("Link copied to clipboard!")
                      }} 
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white px-4 py-2 rounded font-bold transition-all"
                    >
                      Copy
                    </button>
                </div>
            </div>
          </div>
        )}

        {/* Embed Modal */}
        {embedModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 px-4">
            <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md border border-gray-800">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Embed GIF</h3>
                    <button onClick={() => setEmbedModalOpen(false)} className="text-gray-400 hover:text-white"><IoMdClose size={24}/></button>
                </div>
                <div className="flex gap-2">
                    <textarea value={embedCode} readOnly className="w-full bg-gray-800 p-2 rounded text-gray-300 border border-gray-700 focus:outline-none h-24 resize-none" />
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(embedCode)
                        alert("Embed code copied to clipboard!")
                      }} 
                      className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white px-4 py-2 rounded font-bold transition-all h-fit"
                    >
                      Copy
                    </button>
                </div>
            </div>
          </div>
        )}

    </section>
  )
}

export default GifPage