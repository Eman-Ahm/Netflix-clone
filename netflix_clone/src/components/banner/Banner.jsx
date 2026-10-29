import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import "./banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(requests.fetchNetflixOriginals);
        const movies = response.data.results || [];

        if (movies.length > 0) {
          const featuredMovie =
            movies[Math.floor(Math.random() * movies.length)];

          setMovie(featuredMovie);
        }
      } catch (error) {
        console.error("Failed to load banner movie:", error);
      }
    }

    fetchData();
  }, []);

  function truncate(text, limit) {
    if (!text) return "";
    return text.length > limit ? `${text.substring(0, limit - 1)}...` : text;
  }

  function handlePlay() {
    if (!movie) return;

    const title = movie.title || movie.name || movie.original_name;
    window.alert(
      `Ready to play: ${title}\n\nVideo playback will be added later.`,
    );
  }

  function handleMoreInfo() {
    if (!movie) return;

    const title = movie.title || movie.name || movie.original_name;
    const description = movie.overview || "No description available.";

    window.alert(`${title}\n\n${description}`);
  }

  const backgroundImage = movie?.backdrop_path
    ? `url("https://image.tmdb.org/t/p/original${movie.backdrop_path}")`
    : undefined;

  return (
    <section
      className="banner"
      style={backgroundImage ? { backgroundImage } : undefined}
      aria-label="Featured movie"
    >
      <div className="banner_overlay" />

      <div className="banner_contents">
        <p className="banner_label">FEATURED ON NETFLIX CLONE</p>

        <h1 className="banner_title">
          {movie?.title ||
            movie?.name ||
            movie?.original_name ||
            "Discover Movies"}
        </h1>

        <div className="banner_buttons">
          <button
            type="button"
            className="banner_button play"
            onClick={handlePlay}
            disabled={!movie}
          >
            ▶ Play
          </button>

          <button
            type="button"
            className="banner_button"
            onClick={handleMoreInfo}
            disabled={!movie}
          >
            ⓘ More Info
          </button>
        </div>

        <p className="banner_description">
          {movie
            ? truncate(movie.overview, 180)
            : "Discover movies and TV shows you'll love."}
        </p>
      </div>

      <div className="banner_fadeBottom" />
    </section>
  );
}

export default Banner;
