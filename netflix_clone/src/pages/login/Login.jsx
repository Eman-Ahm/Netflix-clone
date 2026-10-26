import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSignup = location.pathname === "/signup";

  const [email, setEmail] = useState(
    new URLSearchParams(location.search).get("email") || "",
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    // Demo only: no server or real account verification.
    localStorage.setItem("demoLoggedIn", "true");
    localStorage.setItem("demoEmail", email.trim());

    navigate("/home");
  }

  return (
    <main className="login_page">
      <form className="login_card" onSubmit={handleSubmit}>
        <h1>{isSignup ? "Create Account" : "Sign In"}</h1>

        <p className="login_subtitle">
          {isSignup
            ? "Create your demo account to explore Yitawek."
            : "Welcome back. Sign in to continue."}
        </p>

        {error && <p className="login_error">{error}</p>}

        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter any demo password"
          required
        />

        <button type="submit">{isSignup ? "Create Account" : "Sign In"}</button>

        <p className="demo_note">
          Demo only. Any valid email and non-empty password will work. This does
          not create a real account.
        </p>

        <p className="login_back">
          {isSignup ? "Already have an account? " : "New to Yitawek? "}
          <Link to={isSignup ? "/login" : "/signup"}>
            {isSignup ? "Sign In" : "Create Account"}
          </Link>
        </p>

        <p className="login_back">
          <Link to="/">Back to Welcome</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
