import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);
        const movies = request.data.results || [];

        if (movies.length > 0) {
          const randomMovie = movies[Math.floor(Math.random() * movies.length)];

          setMovie(randomMovie);
        }
      } catch (error) {
        console.error("Failed to load banner movie:", error);
      }
    }

    fetchData();
  }, []);

  function truncate(text, limit) {
    if (!text) return "";
    return text.length > limit ? text.substring(0, limit - 1) + "..." : text;
  }

  return (
    <section
      className="banner"
      style={
        movie?.backdrop_path
          ? {
              backgroundImage: `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`,
            }
          : undefined
      }
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name || ""}
        </h1>

        <div className="banner_buttons">
          <button type="button" className="banner_button play">
            Play
          </button>

          <button type="button" className="banner_button">
            My List
          </button>
        </div>

        <p className="banner_description">{truncate(movie?.overview, 150)}</p>
      </div>

      <div className="banner_fadeBottom" />
    </section>
  );
}

export default Banner;
