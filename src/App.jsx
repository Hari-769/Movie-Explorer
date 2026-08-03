import './App.css'
import Header from "./Header.jsx"
import Navbar from "./Navbar.jsx"
import Moviecards from './Moviecards.jsx'
import { useState, useEffect, useRef } from "react";
import Moviedetails from './Moviedetails.jsx';
function App() {
   const apiKey = import.meta.env.VITE_API_KEY;
  const [search, setSearch] = useState("")
   const [selectedgenre,setSelectedgenre] =useState("")
   const [selectpopularity,setSelectpopularity]=useState("Popular")
   const [selectyear,setselectyear]=useState("")
   const [showFavorites, setShowFavorites] = useState(false);
   const [darkMode, setDarkMode] = useState(true);
   const [selectedMovie, setSelectedMovie] = useState(null);
   const [isliked,setIsliked] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
});

  useEffect(() => {

    localStorage.setItem(
        "favorites",
        JSON.stringify(isliked)
    );

}, [isliked]);

   
   const Gohome = () =>{
         setSearch("")
         setSelectedgenre("");
         setselectyear("")
         setSelectpopularity("Popular");
         setShowFavorites(false);
        window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    } 
    const headerfeatures = () =>{
         setSearch("")
         setSelectedgenre("");
         setselectyear("")
         setSelectpopularity("Popular");
         setShowFavorites(false);
    } 
     const toprated = () =>{
      console.log("Top Rated button clicked");
         setSearch("")
         setSelectedgenre("");
         setselectyear("")
         setSelectpopularity("Top Rated");
         setShowFavorites(false);
    } 
    useEffect(() => {
    console.log("Selected movie changed:", selectedMovie);
}, [selectedMovie]);
  return(
    <>
    <div className={darkMode ? "app dark" : "app light"}>
      <div className="header-wrapper">
      <Header Gohome={Gohome} headerfeatures={headerfeatures} toprated={toprated} isliked={isliked} setIsliked={setIsliked}  setShowFavorites={setShowFavorites} darkMode={darkMode} setDarkMode={setDarkMode} />
      
      <Navbar
      search={search}
      setSearch={setSearch}
      selectedgenre={selectedgenre}
      setSelectedgenre={setSelectedgenre}
      selectpopularity={selectpopularity}
      setSelectpopularity={setSelectpopularity}
      selectyear={selectyear}
      setselectyear={setselectyear}
      showFavorites={showFavorites}/>
      </div>
      <Moviecards
    search={search}
    selectedgenre={selectedgenre}
    selectpopularity={selectpopularity}
    selectyear={selectyear}
    isliked={isliked}
    setIsliked={setIsliked}
    showFavorites={showFavorites}
    selectedMovie={selectedMovie}
    setSelectedMovie={setSelectedMovie}
/>

{selectedMovie && (
    <Moviedetails
        selectedMovie={selectedMovie}
        setSelectedMovie={setSelectedMovie}
        isliked={isliked} setIsliked={setIsliked}
    />
)}
    </div>
    </>
  )
}

export default App
