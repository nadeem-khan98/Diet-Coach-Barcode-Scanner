import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const nav = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    age: "",
    height: "",
    name: "",
    goal: "",
    activityLevel: "",
    diseases: [],
  });

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ Handle checkbox diseases
  const handleDiseaseChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setForm({
        ...form,
        diseases: [...form.diseases, value],
      });
    } else {
      setForm({
        ...form,
        diseases: form.diseases.filter((d) => d !== value),
      });
    }
  };

  const submit = async () => {
    await axios.post("/api/auth/signup", form);
    alert("Signup success");
    nav("/");
  };

  return (
    <div>
      <h2>Signup</h2>

      <input name="name" placeholder="Full Name" onChange={change} />
      <input name="email" placeholder="Email" onChange={change} />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={change}
      />
      <input name="age" placeholder="Age" onChange={change} />
      <input name="height" placeholder="Height" onChange={change} />

      {/* Goal */}
      <select name="goal" onChange={change}>
        <option value="">Select Goal</option>
        <option value="Weight Loss">Weight Loss</option>
        <option value="Muscle Gain">Muscle Gain</option>
        <option value="Maintain Weight">Maintain Weight</option>
      </select>

      {/* Activity Level */}
      <select name="activityLevel" onChange={change}>
        <option value="">Activity Level</option>
        <option value="Sedentary">Sedentary</option>
        <option value="Lightly Active">Lightly Active</option>
        <option value="Moderately Active">Moderately Active</option>
        <option value="Very Active">Very Active</option>
      </select>

      {/* ✅ Disease Checkbox Section */}
      <h4>Select Diseases (optional)</h4>

      <div>
        <label>
          <input
            type="checkbox"
            value="Diabetes"
            onChange={handleDiseaseChange}
          />
          Diabetes
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="High Blood Pressure"
            onChange={handleDiseaseChange}
          />
          High Blood Pressure
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="Heart Disease"
            onChange={handleDiseaseChange}
          />
          Heart Disease
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="High Cholesterol"
            onChange={handleDiseaseChange}
          />
          High Cholesterol
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="Thyroid"
            onChange={handleDiseaseChange}
          />
          Thyroid
        </label>
      </div>

      <div>
        <label>
          <input
            type="checkbox"
            value="Obesity"
            onChange={handleDiseaseChange}
          />
          Obesity
        </label>
      </div>

      <br />

      <button onClick={submit}>Signup</button>

      <p>
        Already registered? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
