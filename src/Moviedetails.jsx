import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
function Moviedetails({ selectedMovie, setSelectedMovie, isliked, setIsliked }) {
    if (!selectedMovie) return null;
    const apiKey = import.meta.env.VITE_API_KEY;
    const imgurl = "https://image.tmdb.org/t/p/w500";
    const [video, setVideo] = useState(null);
    const [details,setDeatails]= useState(null)
    const [loading, setLoading] = useState(true);
    const videourl = `https://api.themoviedb.org/3/movie/${selectedMovie.id}/videos?api_key=${apiKey}`
    const detailsUrl = `https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=${apiKey}`;
    const like = (id) => {
        if (!isliked.includes(id)) {
            setIsliked([...isliked, id]);
        } else {
            setIsliked(
                isliked.filter(movieId => movieId !== id)
            );
        }
    };
    useEffect(()=>{
        if (!selectedMovie) return;
        const getfulldetails = async () =>{
            setLoading(true)
            try {
            const res = await fetch(detailsUrl);
            const data = await res.json();

            setDeatails(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
        getfulldetails();
    },[detailsUrl])
    console.log("DETAILS=",details)

    useEffect(() => {
    const getdata = async () => {
        const response = await fetch(videourl);
        const data = await response.json();
        console.log("data =", data);
        const trailer = data.results.find(video =>video.site === "YouTube" && video.type === "Trailer");

        if (trailer) {
            setVideo(trailer.key);
        }
    };

    getdata();
}, [selectedMovie]);
    if (loading) {
    return (
        <div className="moviedetails">
            <div className="overlay"></div>

            <div className="detailscard loading-card">
                <div className="spinner"></div>
                <p>Loading movie details...</p>
            </div>
        </div>
    );
}
function convertMinutes(totalMinutes) {
   
    let totalSeconds = Math.round(totalMinutes * 60);
    
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    
    let pad = (num) => String(num).padStart(2, '0');
    
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

   return (
  <div className="moviedetails">
    <div
      className="overlay"
      onClick={() => setSelectedMovie(null)}
    ></div>

    <div className="detailscard">

      <div className="options">
        <button
          className="close-btn"
          onClick={() => setSelectedMovie(null)}
        >
          ✕
        </button>

        <button
          className="fav-btn"
          onClick={() => like(selectedMovie.id)}
        >
          <FontAwesomeIcon
            icon={
              isliked.includes(selectedMovie.id)
                ? faHeartSolid
                : faHeartRegular
            }
          />
        </button>
      </div>

      <div className="poster-section">
        <img
          src={`${imgurl}${selectedMovie.poster_path}`}
          alt={selectedMovie.title}
        />
      </div>

      <div className="movie-content">

        <h1>{selectedMovie.title}</h1>
        <h2>{details?.tagline}</h2>

        <div className="movie-tags">
          <span>⭐ {selectedMovie.vote_average.toFixed(1)}</span>
          <span>📅 {selectedMovie.release_date}</span>
          <span>🌍 {selectedMovie.original_language.toUpperCase()}</span>
        </div>

        <p className="overview">
          {selectedMovie.overview}
        </p>

        <div className="detailbox1">
            <p>🎬{details?.genres?.map(genre => genre.name).join(", ")}</p>
            <p>⏱{convertMinutes(details?.runtime)}</p>
            <p> 📌{details?.status}</p>
        </div>

        <div className="money">
            <p>💰{details?.budget.toLocaleString('en-US')}</p>
            <p>💵{details?.revenue.toLocaleString('en-US')}</p>
        </div>

        <div className="productioncompanies">
            <h4>Production Companies</h4>
            {details?.production_companies?.map((comapany)=>{
                return <p key={comapany.id}>{comapany.name}</p>
            })}
        </div>

        <div className="stats">

          <div className="stat-box">
            <h4>Popularity</h4>
            <p>{Math.round(selectedMovie.popularity)}</p>
          </div>

          <div className="stat-box">
            <h4>Votes</h4>
            <p>{selectedMovie.vote_count}</p>
          </div>

          <div className="stat-box">
            <h4>Adult</h4>
            <p>{selectedMovie.adult ? "Yes" : "No"}</p>
          </div>

        </div>

        <div className="buttons-row">

          <button className="watch-btn"   disabled={!video} onClick={() =>window.open(`https://www.youtube.com/watch?v=${video}`,"_blank")} >
             {video ? "▶ Watch Trailer" : "Trailer Unavailable"}
          </button>

          <button className="tmdb-btn" onClick={() =>window.open(`https://www.themoviedb.org/movie/${selectedMovie.id}`,"_blank")}>
            View on TMDB
          </button>

        </div>

      </div>

    </div>
  </div>
);
}

export default Moviedetails;