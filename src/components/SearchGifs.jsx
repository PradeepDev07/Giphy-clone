import  {  useState , useRef} from 'react'
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { HiMiniXMark } from 'react-icons/hi2';


const SearchGifs = () => {
const [query , setQuery] = useState("")
const  navigation = useNavigate();
const inputRef = useRef(null);

const handleSearch = ()=>{
    if(query.trim().length >0){
        navigation(`/search/${query}`)
    }
    

}


const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
    if(e.key === 'Escape'){
        setQuery('');
        inputRef.current.blur();
    }
    console.log(e.key);
};

  return (
    <div name="search-gifs" className='w-full flex justify-between items-center my-5 bg-gray-100 bg-opacity-10 rounded overflow-auto '>
        <input ref={inputRef} value={query} onChange={(e)=>setQuery(e.target.value)} onKeyPress={handleKeyPress} className="focus:outline-none focus:ring-0 w-full d py-2 px-4 rounded bg-transparent text-black font-mono" placeholder="Search GIFs..." />
        <div className='flex justify-center items-center'>

      
        {query && (
          <button onClick={() => setQuery('')} className="text-white p-2">
            <HiMiniXMark size={24} className='bg-gray-300 rounded-4xl ' />
          </button>
        )}
        <button className='search-button-bg p-2 h-full cursor-pointer' onClick={handleSearch}>
            <IoSearch size={28} className="text-white m-1"/>
        </button>
          </div>
    </div>
  )
}

export default SearchGifs