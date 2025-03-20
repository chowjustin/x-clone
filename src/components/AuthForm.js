import { useState } from "react";

const AuthForm = ({ login }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() === "") return alert("Username cannot be empty!");
    login(username);
  };

  return (
    <section className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <img src="/xlogo.png" alt="logo" className="auth-logo" />
        <h2 className="auth-heading">Login</h2>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="blue-button auth-button">
          Login
        </button>
      </form>
    </section>
  );
};

export default AuthForm;
