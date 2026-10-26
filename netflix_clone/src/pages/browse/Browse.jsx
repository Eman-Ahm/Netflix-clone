import React from "react";
import Row from "../../components/rows/row/Row";
import requests from "../../utils/requests";

function Browse({ type }) {
  const [playingRow, setPlayingRow] = React.useState(null);

  const sections = {
    tv: [
      ["Popular TV Shows", "/tv/popular?api_key="],
      ["Top Rated TV Shows", "/tv/top_rated?api_key="],
      ["Airing Today", "/tv/airing_today?api_key="],
    ],
    movie: [
      ["Popular Movies", "/movie/popular?api_key="],
      ["Top Rated Movies", requests.fetchTopRated],
      ["Action Movies", requests.fetchActionMovies],
      ["Comedy Movies", requests.fetchComedyMovies],
    ],
    latest: [
      ["Now Playing", requests.fetchLatestMovies],
      ["Trending This Week", requests.fetchTrending],
      ["Popular Movies", "/movie/popular?api_key="],
    ],
  };

  const apiKey = process.env.REACT_APP_API_KEY;
  const rows = sections[type] || sections.movie;

  return (
    <main style={{ minHeight: "70vh", paddingTop: "90px" }}>
      <h1 style={{ margin: "20px 4%", color: "white" }}>
        {type === "tv" ? "TV Shows" : type === "latest" ? "Latest" : "Movies"}
      </h1>

      {rows.map(([title, url], index) => {
        const fetchUrl = url.includes("?api_key=") ? `${url}${apiKey}` : url;

        return (
          <Row
            key={`${type}-${index}`}
            id={`${type}-${index}`}
            title={title}
            fetchUrl={fetchUrl}
            playingRow={playingRow}
            setPlayingRow={setPlayingRow}
          />
        );
      })}
    </main>
  );
}

export default Browse;
