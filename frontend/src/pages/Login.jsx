import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) nav("/dashboard");
  }, [nav]);

  const login = async () => {

    const res = await axios.post("/api/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", res.data.token);

    nav("/dashboard");
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />

      <button onClick={login}>Login</button>

      <p>
        Don't have account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}