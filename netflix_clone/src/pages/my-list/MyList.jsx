import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../utils/axios";
import "./my-list.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const featuredTitles = [
  { id: "game-of-thrones", title: "Game of Thrones", query: "Game of Thrones" },
  { id: "squid-game", title: "Squid Game", query: "Squid Game" },
  { id: "money-heist", title: "Money Heist", query: "Money Heist" },
  { id: "the-hobbit", title: "The Hobbit", query: "The Hobbit" },
];

function MyList() {
  const [titles, setTitles] = useState([]);
  const [saved, setSaved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("demoMyList") || "[]");
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const isLoggedIn = localStorage.getItem("demoLoggedIn") === "true";

  useEffect(() => {
    let cancelled = false;

    async function loadTitles() {
      try {
        setLoading(true);
        setError("");

        const results = await Promise.all(
          featuredTitles.map(async (item) => {
            const response = await axios.get("/search/multi", {
              params: {
                api_key: API_KEY,
                query: item.query,
                include_adult: false,
              },
            });

            const match = (response.data.results || []).find(
              (result) =>
                (result.media_type === "movie" || result.media_type === "tv") &&
                result.poster_path,
            );

            return match
              ? {
                  id: String(match.id),
                  title: match.title || match.name || item.title,
                  mediaType: match.media_type,
                  poster: match.poster_path,
                  backdrop: match.backdrop_path,
                  overview: match.overview || "",
                }
              : null;
          }),
        );

        if (!cancelled) {
          setTitles(results.filter(Boolean));
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            "We couldn't load titles from TMDB. Check your internet connection and API key.",
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    if (API_KEY) {
      loadTitles();
    } else {
      setLoading(false);
      setError("TMDB API key is missing. Check your frontend .env file.");
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("demoMyList", JSON.stringify(saved));
  }, [saved]);

  function toggleSaved(movie) {
    setSaved((current) =>
      current.some((item) => item.id === movie.id)
        ? current.filter((item) => item.id !== movie.id)
        : [...current, movie],
    );
  }

  function isSaved(id) {
    return saved.some((movie) => movie.id === id);
  }

  if (!isLoggedIn) {
    return (
      <main className="my_list_page">
        <section className="my_list_message">
          <h1>My List</h1>
          <p>Sign in to save your favorite titles.</p>
          <Link className="my_list_button" to="/login">
            Sign In
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="my_list_page">
      <h1>My List</h1>
      <p className="my_list_intro">
        Your favorite shows and movies, all in one place.
      </p>

      {loading && <p>Loading titles...</p>}
      {error && <p className="my_list_error">{error}</p>}

      {!loading && !error && (
        <>
          <h2>Featured titles</h2>

          <div className="my_list_grid">
            {titles.map((movie) => (
              <article className="my_list_card" key={movie.id}>
                <div className="my_list_poster">
                  {movie.backdrop ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop}`}
                      alt={`${movie.title} banner`}
                    />
                  ) : (
                    <img
                      src={`https://image.tmdb.org/t/p/w342${movie.poster}`}
                      alt={`${movie.title} poster`}
                    />
                  )}
                </div>

                <div className="my_list_card_body">
                  <h3>{movie.title}</h3>
                  <p>{movie.mediaType === "tv" ? "TV Series" : "Movie"}</p>
                  <button
                    className={isSaved(movie.id) ? "saved_button" : ""}
                    onClick={() => toggleSaved(movie)}
                  >
                    {isSaved(movie.id) ? "✓ In My List" : "+ My List"}
                  </button>
                </div>
              </article>
            ))}
          </div>

          <h2>Saved titles ({saved.length})</h2>

          {saved.length === 0 ? (
            <p>You haven't added any titles yet.</p>
          ) : (
            <div className="my_list_grid">
              {saved.map((movie) => (
                <article className="my_list_card" key={movie.id}>
                  <div className="my_list_poster">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${
                        movie.backdrop || movie.poster
                      }`}
                      alt={movie.title}
                    />
                  </div>
                  <div className="my_list_card_body">
                    <h3>{movie.title}</h3>
                    <button
                      className="saved_button"
                      onClick={() => toggleSaved(movie)}
                    >
                      ✓ Remove
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default MyList;
