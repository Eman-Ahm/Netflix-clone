import React, { useState } from "react";
import Row from "../row/Row";
import requests from "../../../utils/requests";
import "./rowList/rowList.css";

function RowList() {
  const [playingRow, setPlayingRow] = useState(null); // Track which row is playing

  return (
    <div className="gap">
      <Row
        id="trending"
        title="Trending Now"
        fetchUrl={requests.fetchTrending}
        isLargeRow
        playingRow={playingRow}
        setPlayingRow={setPlayingRow}
      />

      <Row
        id="topRated"
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        playingRow={playingRow}
        setPlayingRow={setPlayingRow}
      />

      <Row
        id="action"
        title="Action Movies"
        fetchUrl={requests.fetchActionMovies}
        playingRow={playingRow}
        setPlayingRow={setPlayingRow}
      />

      <Row
        id="comedy"
        title="Comedy Movies"
        fetchUrl={requests.fetchComedyMovies}
        playingRow={playingRow}
        setPlayingRow={setPlayingRow}
      />

      <Row
        id="horror"
        title="Horror Movies"
        fetchUrl={requests.fetchHorrorMovies}
        playingRow={playingRow}
        setPlayingRow={setPlayingRow}
      />

      <Row
        id="romance"
        title="Romance Movies"
        fetchUrl={requests.fetchRomanceMovies}
        playingRow={playingRow}
        setPlayingRow={setPlayingRow}
      />

      <Row
        id="docs"
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        playingRow={playingRow}
        setPlayingRow={setPlayingRow}
      />

      <Row
        id="latest"
        title="Latest Movies"
        fetchUrl={requests.fetchLatestMovies}
        playingRow={playingRow}
        setPlayingRow={setPlayingRow}
      />
    </div>
  );
}

export default RowList;
