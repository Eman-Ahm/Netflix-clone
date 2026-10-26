import React from "react";
import { useSearchParams } from "react-router-dom";
import axios from "../../utils/axios";
import "./search.css";

function Search() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [results, setResults] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    let cancelled = false;

    async function searchMovies() {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get("/search/multi", {
          params: {
            api_key: process.env.REACT_APP_API_KEY,
            query,
            include_adult: false,
          },
        });

        if (!cancelled) {
          setResults(
            (response.data.results || []).filter(
              (item) =>
                item.poster_path &&
                (item.media_type === "movie" || item.media_type === "tv"),
            ),
          );
        }
      } catch {
        if (!cancelled) {
          setError("Search failed. Please check your TMDB API connection.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    searchMovies();

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <main className="search_page">
      <h1>Search Results</h1>
      {query && <p>Results for: {query}</p>}
      {loading && <p>Loading movies and shows...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && query && results.length === 0 && (
        <p>No matching movies or shows found.</p>
      )}

      <div className="search_results">
        {results.map((item) => (
          <article
            className="search_card"
            key={`${item.media_type}-${item.id}`}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
              alt={item.title || item.name}
            />
            <h3>{item.title || item.name}</h3>
            <p>{item.media_type === "tv" ? "TV Show" : "Movie"}</p>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Search;
