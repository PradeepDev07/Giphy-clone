import { HiArrowTrendingUp } from "react-icons/hi2";
import { GifState } from "../context/GifContext.jsx"
const filterConst =[
    {
        title:"GIFs",
        value:"gifs",
        background:"bg-gradient-to-tr from-purple-500 via-purple-600 to-purple-500"
    },
    {
        title:"Stickers",
        value:"stickers",
        background:"bg-gradient-to-tr from-teal-500 via-teal-600 to-teal-500"
    }
    ,
    {
        title:"Text",
        value:"text",
        background:"bg-gradient-to-tr from-blue-500 via-blue-600 to-blue-500"
    }
]

const FilterGifs = ({hidetrend=false, showFilter=true}) => {
    const {filter,setFilter} = GifState()
  return showFilter && <div className=" py-1 my-2 w-full flex justify-between  space-x-4 flex-col md:flex-row md:items-center gap-4">
        {!hidetrend && <div >
            <HiArrowTrendingUp size={24} className="inline-block mr-2 text-teal-400" />
            <span>Trending</span>
        </div>}
        <div className="bg-gray-800 flex rounded-full justify-around">
            {filterConst.map((fil)=>(
                <button 
                key={fil.value }
                className={`w-full py-2  px-3 mr-2 rounded-full text-white font-semibold ${ fil.value === filter ? fil.background : ""}`}
                onClick={()=>setFilter(fil.value)}
                >
                    {fil.title}
                </button>
            ))}
        </div>
    </div> }

    
  


export default FilterGifs