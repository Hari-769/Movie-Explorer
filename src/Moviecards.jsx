import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect, useRef } from "react";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
function Moviecards({ search,selectedgenre,selectpopularity,selectyear,isliked,setIsliked,showFavorites,selectedMovie, setSelectedMovie}){
    const apiKey = import.meta.env.VITE_API_KEY;
    console.log(setSelectedMovie);
     const imgurl = "https://image.tmdb.org/t/p/w500"
     const [loading, setLoading] = useState(false);
     const [movies,setmovies]=useState([]);

     const genresid = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];
    const endpoints = {
  "Popular": "movie/popular",
  "Top Rated": "movie/top_rated",
  "Now Playing": "movie/now_playing",
  "Upcoming": "movie/upcoming",
  "Trending Today": "trending/movie/day",
  "Trending This Week": "trending/movie/week",
};
const endpoint = endpoints[selectpopularity];
const url = `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}`;
    useEffect(() => {
    const getDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(url);
            const data = await response.json();
            setmovies(data.results);
            setLoading(false);
            console.log(data.results[0]);
        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    getDetails();
}, [selectpopularity]);

    if (loading) {
    return (
        <div className="loading">
            <div className="spinner"></div>
            <p>Loading movies...</p>
        </div>
    );
}
    

   const like = (id) => {
    if (!isliked.includes(id)) {
        setIsliked([...isliked, id]);
    } else {
        setIsliked(
            isliked.filter(movieId => movieId !== id)
        );
    }
};
    const filteredMovies = movies.filter(movie =>movie.title.toLowerCase().includes(search.toLowerCase()));
    const genreid = genresid.find(genre=>genre.name===selectedgenre)
    const required_id = genreid?.id;
    let displayedMovies = filteredMovies;
    
    

if (selectedgenre !== "") {
    displayedMovies = filteredMovies.filter(movie=>movie.genre_ids.includes(required_id));
}
if (selectyear !== ""){
     displayedMovies= displayedMovies.filter(movie=>movie.release_date.slice(0,4)===String(selectyear))
}
    if(showFavorites){
        displayedMovies=displayedMovies.filter(movie=>isliked.includes(movie.id))
    }
    


    return(
        <>
        <div className="moviecards">
            {displayedMovies.map((movie)=>{
                return(
                    <div className="cards" key={movie.id} onClick={() => {console.log(movie);setSelectedMovie(movie);}}>
                        <img src={`${imgurl}${movie.poster_path}`} alt={movie.title}></img>
                        <button className="favorite-btn" onClick={(e) => {e.stopPropagation();like(movie.id);}}>
                            <FontAwesomeIcon icon={isliked.includes(movie.id) ? faHeartSolid : faHeartRegular}
                            style={{color: isliked.includes(movie.id) ? "#ff4d6d" : "#ffffff"}}/>
                        </button>
                        <h3>{movie.title}</h3>
                        <div className="movie-info">
                            <div className="rating">
                            <FontAwesomeIcon icon={faStar} />
                            <span>{movie.vote_average.toFixed(1)}</span>
                            </div>
                            <div className="date">
                            <FontAwesomeIcon icon={faCalendar} />
                            <span>{movie.release_date.slice(0,4)}</span>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

        </>
    )
}

export default Moviecards