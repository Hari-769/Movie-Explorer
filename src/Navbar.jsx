import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect, useRef } from "react";
function Navbar({ search, setSearch, selectedgenre, setSelectedgenre,selectpopularity,setSelectpopularity,selectyear,setselectyear}){

    const genres = [
        "Action",
        "Adventure",
        "Animation",
        "Comedy",
        "Crime",
        "Documentary",
        "Drama",
        "Family",
        "Fantasy",
        "History",
        "Horror",
        "Music",
        "Mystery",
        "Romance",
        "Science Fiction",
        "TV Movie",
        "Thriller",
        "War",
        "Western"
    ];
    const popularity = [
    "Popular",
    "Top Rated",
    "Now Playing",
    "Upcoming",
    "Trending Today",
    "Trending This Week"
];
    const currentYear = new Date().getFullYear();
    const years = Array.from(
    { length: currentYear - 2000 + 1 },
    (_, index) => currentYear - index
    );
    const [placeholder, setPlaceholder] = useState("Search movies by title...");

    const [showGenres, setShowGenres] = useState(false);
    const [showPopularity, setShowPopularity] = useState(false);
    const [showYears, setShowYears] = useState(false);
    const dropdownRef = useRef(null);

    const toggleGenres = () => {
    setShowGenres(!showGenres);
    setShowPopularity(false);
    setShowYears(false);
};

const togglePopularity = () => {
    setShowPopularity(!showPopularity);
    setShowGenres(false);
    setShowYears(false);
};

const toggleYears = () => {
    setShowYears(!showYears);
    setShowGenres(false);
    setShowPopularity(false);
};
useEffect(() => {
    const handleClickOutside = (event) => {

        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setShowGenres(false);
            setShowPopularity(false);
            setShowYears(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, []);
const handlegenre = (genre) =>{
        setSelectedgenre(genre);
        setShowGenres(false);

    }
    const handlepopularity = (popularity) =>{
        setSelectpopularity(popularity)
        setShowPopularity(false);

    }
    const handleyear = (year) =>{
        setselectyear(year)
        setShowYears(false);
    }
    const allclear = () =>{
        setSearch("")
         setSelectedgenre("");
         setselectyear("")
         setSelectpopularity("Popular");
    } 
    return(
        <>
        <div className="search-container" ref={dropdownRef}>
            <div className="both">
            <input
  type="text"
  className="search"
  value={search}
  placeholder={placeholder}
  onChange={(e) => setSearch(e.target.value)}
  onFocus={() => setPlaceholder("")}
  onBlur={() => {
    if (search === "") {
      setPlaceholder("Search movies by title...");
    }
  }}/>
  
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
            </div>
        <div className="gener">
        <button onClick={toggleGenres} className="genrebutton" >{selectedgenre || "All Genres"}</button>
        {showGenres &&(
        <div className="genre-content">
            {genres.map((genre)=>{
                return(
                <a href="#" key={genre} onClick={(e) => {e.preventDefault();handlegenre(genre);}}>{genre}</a>
                )
            })}
        </div>
        )}
        </div>
        <div className="popularity">
        <button onClick={togglePopularity} className="popularitybutton">Sort by:{selectpopularity || "Popular"}</button>
        {showPopularity &&(
        <div className="popularity-content">
            {popularity.map((popularity)=>{
                return(
                <a href="#" key={popularity} onClick={(e)=> {e.preventDefault();handlepopularity(popularity);}}>{popularity}</a>
                )
            })}
        </div>
        )}
        </div>
        <div className="year">
        <button onClick={toggleYears} className="yearbutton">{selectyear || "All Years"}</button>
        {showYears &&(
        <div className="dropdown-content">
            {years.map((year) => (
                <a href="#" key={year} onClick={(e)=>{e.preventDefault();handleyear(year)}}>
                    {year}
                </a>
            ))}
        </div>
        )}
        </div>
        <div className="clear-container">
            <button className="clear-button" onClick={allclear}>Clear filters</button>
        </div>
        </div>
        </>
    )
}

export default Navbar