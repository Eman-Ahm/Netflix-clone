import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./row.css";

function Row({ id, title, fetchUrl, isLargeRow, playingRow, setPlayingRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const base_url = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results || []);
    }
    fetchData();
  }, [fetchUrl]);

  useEffect(() => {
    if (playingRow !== id) {
      setTrailerUrl("");
    }
  }, [playingRow, id]);

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
      setPlayingRow(null);
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));

          // 🔥 SET this row as the only video playing
          setPlayingRow(id);
        })
        .catch((error) => console.log("Trailer not found:", error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.title}
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
          />
        ))}
      </div>

      {trailerUrl && (
        <YouTube
          videoId={trailerUrl}
          opts={{
            height: "390",
            width: "100%",
            playerVars: { autoplay: 1 },
          }}
        />
      )}
    </div>
  );
}

export default Row;
