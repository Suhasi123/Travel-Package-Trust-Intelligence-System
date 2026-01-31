import { useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await client.post("/auth/login", new URLSearchParams({
        username: email,
        password: password,
      }));

      localStorage.setItem("token", res.data.access_token);

      const me = await client.get("/auth/me");
      console.log("ME:", me.data);
      console.log("ROLE:", me.data.role);

      const role = me.data.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "company") {
        navigate("/company-dashboard");
      } else {
        navigate("/packages");
      }

    } catch (err) {
      console.log(err.response?.data);
      alert("Login failed");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>
      <p>
        New user? <a href="/register-user">Signup here</a>
      </p>

      <p>
        Travel company? <a href="/register-company">Register company account</a>
      </p>

    </div>
  );
}
