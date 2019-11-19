import React, { useState } from "react";

export default function PosterSearch() {
  const [disableSearch, setDisableSearch] = useState(true);
  const [movieName, setMovieName] = useState("");
  const [msg, setMsg] = useState("");
  const [posters,setPosters]=useState([])
  function handleInput({ target: { value } }) {
    setDisableSearch(value.length < 3);
    setMovieName(value);
  }

  function handleClick(e) {
    e.preventDefault();
    setMsg("Searching...");
    fetch(
      `http://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${encodeURIComponent(movieName)}`
    ).then(resp=>resp.json())
      .then(results=>{
        if(results.Response==='True'){
          setMsg(
            `Now showing the first ${results.Search.length} results of ${results.totalResults}`
          )
          setPosters(results.Search)
          setDisableSearch(false)
        }
        else{
          if(results.Error==='Movie not found!'){
            setMsg('Sorry, we couldn\'t find that one. Please try again.')
          }
          else{
            setMsg(results.Error)
          }
        }
      
    })
    .catch(err=>{
      setMsg('Something went wrong. Please try again later.')
    });
  }
  return (
    <>
      <section className="PosterSearch">
        <header className="header">
          <h1>Posterz</h1>
          <h3>Find your favourite movie posters.</h3>
        </header>
        <main>
          <p>
            <label className="label" htmlFor="movie-name">
              Movie title:
            </label>{" "}
            <input
              className="searchBox"
              type="search"
              id="movie-name"
              name="movie-name"
              placeholder="enter the name of a movie"
              onChange={handleInput}
            />
            <button
              id="search-button"
              className="searchButton"
              
              disabled={disableSearch}
              onClick={handleClick}
            >
              Search
            </button>
            <br />
          </p>
          <p id="msg">{msg}</p>
        </main>
        <section id="poster-grid" className="PosterGrid">
          {posters.map(poster=>{
            return(<img
              key={poster.Title}
              src={poster.Poster}
              alt={poster.Title}
              title={poster.Title}
            />)
          })}
      </section>
      </section>
    </>
    );
}
