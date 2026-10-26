import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./welcome.css";

function Welcome() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function getStarted(event) {
    event.preventDefault();

    if (!email.trim()) return;

    navigate(`/signup?email=${encodeURIComponent(email.trim())}`);
  }

  return (
    <main className="welcome_page">
      <div className="welcome_background" />

      <header className="welcome_header">
        <img
          src={require("../../assets/images/Netflix_Logo_PMS.png")}
          alt="Yitawek"
        />
        <Link to="/login" className="welcome_signin">
          Sign In
        </Link>
      </header>

      <section className="welcome_content">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Discover your next favorite.</h2>
        <p>
          Ready to explore? Enter your email to create a demo account or sign in
          if you already have one.
        </p>

        <form className="welcome_form" onSubmit={getStarted}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit">Get Started &gt;</button>
        </form>

        <div className="welcome_actions">
          <Link to="/signup">Create Account</Link>
          <Link to="/login">Sign In</Link>
        </div>
      </section>
    </main>
  );
}

export default Welcome;
