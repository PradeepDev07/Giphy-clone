import React, {useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HiEllipsisVertical,HiMiniBars3 } from "react-icons/hi2";
import { GifState } from '../context/GifContext';

const Navbar = () => {
   const {gf,favorites} = GifState();
   const [category,setCategory] = useState([])
   const [showCategory,setShowCategory] = useState(false)
    
   const fetchApiCategories = async()=>{
    const res = await gf.categories()
    setCategory(res.data)
   }

   useEffect(()=>{
    fetchApiCategories();
   },[])

  return (
    <header className='py-2'>
        <nav className='relative flex justify-between items-center  py-2'>
            <Link href="/">
            <div className='flex items-center gap-2 text-white'>
                <img src="/logo.svg" alt="Logo"  className='w-10 sm:w-16 '/>
                <h1 className='text-2xl tracking-tight font-bold cursor-pointer sm:text-4xl md:text-5xl '>GIFER</h1>
            </div>
            </Link>

            {/*Rendering Categories*/}
            <div className='flex items-center gap-4'>
           { category?.slice(0,5)?.map((cat)=>(
            < ul key={cat.name}>

                 <Link to={`/${cat.name_encoded}`} className='text-white mx-2 border-b-4 p-1 hover:gradient-custom hidden md:block'>
            {cat.name.charAt(0).toUpperCase() + cat.name.slice(1)}
            </Link>
            </ul>)
              )}
             <button onClick={()=>setShowCategory(!showCategory)}>
                <HiEllipsisVertical size={34} className={`border-b-4 py-0.5 hover:gradient-custom ${showCategory ? "gradient-custom" : ""} hidden md:block cursor-pointer`}/>
            </button>
            {
                favorites.length > 0 && (
                    <Link to="/favorites" className='text-white mx-2 border-b-4 p-1 hover:gradient-custom '>
                Favorites ({favorites.length})
                </Link>
                )

            }
           
             <button onClick={()=>setShowCategory(!showCategory)}>
                <HiMiniBars3 size={30} className={`border-b-4 py-0.5 hover:gradient-custom ${showCategory ? "gradient-custom" : ""}  md:hidden cursor-pointer`}/>
            </button>
            
            {/* Show Categories */}
            {showCategory && (
                <div className='absolute z-1000 top-full left-0 w-full gradient-custom text-white flex flex-col items-start py-5 px-12 md:px-20 '>
                    <h1 className='text-xl font-extrabold'>Categories</h1>
                    <hr className='border-b border-white opacity-50 w-full my-5'/>
                    
                     <div className='grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  w-full'>
                        {
                            category.map((cat)=><Link to={`/${cat.name_encoded}`} className='text-[16px] font-bold'>{cat.name}</Link>)
                        }
                     </div>
                </div>
            )}
            </div>
            
        </nav>
    </header>
  )
}

export default Navbar