import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import {faSun } from "@fortawesome/free-regular-svg-icons";
import {faCircleUser } from "@fortawesome/free-regular-svg-icons";
function Header({Gohome,headerfeatures,toprated,isliked,setShowFavorites,darkMode,setDarkMode}){
    const apiKey = import.meta.env.VITE_API_KEY;
    const favorites = () => {
    setShowFavorites(true);
};
    return(
        <>
        <header className="header">
            <div className="main" onClick={Gohome}>
                <a href="">
            <FontAwesomeIcon icon={faCirclePlay} className="logo" />
            </a>
            <a href="" className="title">Movie Explorer</a>
            </div>
            <div className="buttons">
                <a href=""onClick={(e) => {e.preventDefault();headerfeatures();}}>Home</a>
                <a href=""onClick={(e) => {e.preventDefault();headerfeatures();}}>Popular</a>
                <a href="" onClick={(e) => {e.preventDefault();toprated();}}>Top Rated</a>
                <a href="" onClick={(e)=>{e.preventDefault();favorites();}} >Favorite</a>
            </div>
            <div className="right">
                <div className="mode">
                <FontAwesomeIcon icon={faSun} className="sun"/>
                <input type="checkbox" id="check" className="lol" checked={!darkMode} onChange={() => setDarkMode(!darkMode)}></input>
                <label htmlFor='check' className="button"></label>
                </div>
                <a href="#">
                <FontAwesomeIcon icon={faCircleUser} className="user" />
                </a>
            </div>
            
        </header>
        </>
    )
}

export default Header