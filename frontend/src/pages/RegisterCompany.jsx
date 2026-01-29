import { useState } from "react";
import client from "../api/client";
import { useNavigate } from "react-router-dom";

export default function RegisterCompany() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    try {
      await client.post("/auth/register-company", {
        email,
        password,
      });

      alert("Company account created. Please login.");
      navigate("/");
    } catch (err) {
      alert("Company registration failed");
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h2>Company Signup</h2>

      <form onSubmit={handleRegister}>
        <input
          placeholder="Company Email"
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

        <button type="submit">Register Company</button>
      </form>
    </div>
  );
}
