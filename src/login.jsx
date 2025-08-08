import React, { useState } from "react";
import "./login.css"; 
export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just call onLogin callback with email
    if (email && password) {
      onLogin(email);
    } else {
      alert("Please enter email and password");
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#0073b1", // LinkedIn blue
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: 40,
          borderRadius: 8,
          width: 320,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "#0073b1", marginBottom: 24 }}>LinkedOut</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email or Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginBottom: 16,
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 12px",
              marginBottom: 24,
              borderRadius: 4,
              border: "1px solid #ccc",
              fontSize: 16,
            }}
            required
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#0073b1",
              color: "white",
              fontWeight: "bold",
              width: "100%",
              padding: 12,
              borderRadius: 4,
              border: "none",
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </form>
        <p style={{ marginTop: 20, fontSize: 14, color: "#666" }}>
          New to LinkedOut?{" "}
          <a href="#" style={{ color: "#0073b1", textDecoration: "none" }}>
            Join now
          </a>
        </p>
      </div>
    </div>
  );
}
