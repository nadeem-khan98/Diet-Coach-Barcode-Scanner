import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {

  const nav = useNavigate();

  const [form, setForm] = useState({
    email:"",
    password:"",
    age:"",
    height:"",
    disease:""
  });

  const change = e =>
    setForm({...form,[e.target.name]:e.target.value});

  const submit = async () => {
    await axios.post("/api/auth/signup", form);
    alert("Signup success");
    nav("/");
  };

  return (
    <div>
      <h2>Signup</h2>

      <input name="email" placeholder="Email" onChange={change}/>
      <input name="password" type="password" placeholder="Password" onChange={change}/>
      <input name="age" placeholder="Age" onChange={change}/>
      <input name="height" placeholder="Height" onChange={change}/>
      <input name="disease" placeholder="Disease" onChange={change}/>

      <button onClick={submit}>Signup</button>

      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}