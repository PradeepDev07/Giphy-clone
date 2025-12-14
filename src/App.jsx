import { BrowserRouter ,Routes , Route  } from "react-router-dom" 
import Home from "./pages/Home"
import Category from "./pages/Category"
import SearchResults from "./pages/Search"
import GifDetail from "./pages/GifPage"
import Favorites from "./pages/Favorites"
import NotFound from "./pages/NotFound"

const App = () => {
  return (
    
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:category" element={<Category />} />
      <Route path="/search/:query" element={<SearchResults />} />
      <Route path="/:type/:slug" element={<GifDetail />} />
      <Route path="/favorites" element={<Favorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </BrowserRouter>

  )
}

export default App
