import React, { useEffect, useRef, useState } from "react";
import axios from "../../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./row.css";

function Row({ id, title, fetchUrl, isLargeRow, playingRow, setPlayingRow }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [trailerError, setTrailerError] = useState("");
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const trailerRequest = useRef(0);
  const baseUrl = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    let cancelled = false;

    async function fetchMovies() {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(fetchUrl);

        if (!cancelled) {
          setMovies(response.data.results || []);
        }
      } catch (err) {
        console.error(`Failed to load ${title}:`, err);

        if (!cancelled) {
          setError("Unable to load movies. Please check your connection.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchMovies();

    return () => {
      cancelled = true;
    };
  }, [fetchUrl, title]);

  useEffect(() => {
    if (playingRow !== id) {
      trailerRequest.current += 1;
      setTrailerUrl("");
      setTrailerError("");
      setLoadingTrailer(false);
    }
  }, [playingRow, id]);

  async function handleClick(movie) {
    if (playingRow === id && trailerUrl) {
      setTrailerUrl("");
      setPlayingRow(null);
      setTrailerError("");
      return;
    }

    const requestId = ++trailerRequest.current;

    setPlayingRow(id);
    setTrailerUrl("");
    setTrailerError("");
    setLoadingTrailer(true);

    try {
      const movieTitle = movie.title || movie.name || movie.original_name;

      const url = await movieTrailer(movieTitle);

      if (!url) {
        throw new Error("Trailer not found");
      }

      const videoId = new URL(url).searchParams.get("v");

      if (!videoId) {
        throw new Error("Invalid trailer URL");
      }

      if (requestId === trailerRequest.current) {
        setTrailerUrl(videoId);
      }
    } catch (err) {
      console.error("Trailer not found:", err);

      if (requestId === trailerRequest.current) {
        setTrailerError("Sorry, no trailer is available for this title.");
      }
    } finally {
      if (requestId === trailerRequest.current) {
        setLoadingTrailer(false);
      }
    }
  }

  return (
    <div className="row">
      <h2 className="row_title">{title}</h2>

      {loading && <p className="row_status">Loading movies...</p>}

      {error && <p className="row_error">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p className="row_status">No movies found in this category.</p>
      )}

      <div className="row_posters">
        {movies.map((movie) => {
          const movieTitle =
            movie.title || movie.name || movie.original_name || "Movie";

          const imagePath = isLargeRow
            ? movie.poster_path || movie.backdrop_path
            : movie.backdrop_path || movie.poster_path;

          if (!imagePath) return null;

          return (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              src={`${baseUrl}${imagePath}`}
              alt={movieTitle}
              title={`Watch trailer: ${movieTitle}`}
              className={`row_poster ${isLargeRow ? "row_posterLarge" : ""}`}
              loading="lazy"
            />
          );
        })}
      </div>

      {loadingTrailer && <p className="row_status">Finding trailer...</p>}

      {trailerError && <p className="row_error">{trailerError}</p>}

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
