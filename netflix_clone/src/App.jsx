import "./App.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./pages/home/Home";
import Browse from "./pages/browse/Browse";
import Search from "./pages/search/Search";
import Login from "./pages/login/Login";
import MyList from "./pages/my-list/MyList";
import Welcome from "./pages/welcome/Welcome";

function App() {
  const location = useLocation();

  const simplePages = ["/", "/login", "/signup"];
  const showSiteHeader = !simplePages.includes(location.pathname);

  return (
    <>
      {showSiteHeader && <Header />}

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Login />} />

        <Route path="/home" element={<Home />} />
        <Route path="/tv-shows" element={<Browse type="tv" />} />
        <Route path="/movies" element={<Browse type="movie" />} />
        <Route path="/latest" element={<Browse type="latest" />} />
        <Route path="/search" element={<Search />} />
        <Route path="/my-list" element={<MyList />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {showSiteHeader && <Footer />}
    </>
  );
}

export default App;
