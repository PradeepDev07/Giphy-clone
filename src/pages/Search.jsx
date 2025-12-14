
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import {GifState} from '../context/GifContext.jsx';
import Navbar from '../components/Navbar.jsx';
import SearchGifs from '../components/SearchGifs';
import FilterGifs from '../components/FilterGifs.jsx';
import Gif from '../components/Gif.jsx';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const {query} = useParams();
  const {gf,filter} = GifState();
  const featchSearchResults = async () => {
    const {data} = await gf.search(
      query,
      {
        sort: "relevant",
        lang: "en",
        limit: 100,
        type: filter,

      }
    );
    setSearchResults(data);
  }

useEffect(() => {
    featchSearchResults();
  }
, [query, filter]);

  return (
    <section className=' pt-5 pb-10 flex justify-center  w-full h-full min-h-screen  bg-gray-950  text-white'>
        <div className=' w-full px-4 lg:max-w-7xl '>       
        <Navbar />
          {/*Search Gifs*/}
           <SearchGifs />
        <div>

           <h1 className='text-3xl font-bold mb-4'>{query}</h1>
           {/*Filter Option*/}
           <FilterGifs hidetrend={true} />

            {/*Rendering GIFs*/}
            <div className='columns-2 sm:columns-3 md:columns-4 lg:columns-5  gap-2 mt-4 '> 
                {
                  searchResults.map(
                    (gif)=> <Gif key={gif.title} gif={gif} />
                    
                  )
                }

            </div>
            
        </div>
 </div>
    </section>
  )
}

export default Search