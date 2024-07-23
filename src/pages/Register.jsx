import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import mountains from "../assets/mountains.jpg"
// import any other dependent files here (ex. checkout)

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name, 
          email, 
          password, 
        }),
      });


      const data = await response.json();
      console.log(data)
      
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setSuccessMessage(data.message);
        setName("");
        setEmail("");
        setPassword("");
        navigate('/login', { state: { registrationSuccessMessage: 'Successfully Registered' } });

      } else {
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      setError(err.message);
    }
  }






  return (
    <div className="register" style={{ backgroundImage: `url(${mountains})` }}>
    <form className="register-form" onSubmit={handleSubmit}>
      <h3>Welcome! Please Fill Out The Below Fields to Register To Zauna.</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your first and last name seperated by a space ...."
      />
      <br />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address ...."
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br />
      <button type="submit">Submit</button>
      {/* <button onClick={() => localStorage.removeItem("token")}>Log Out</button> */}
    </form>
  </div>
  )
}

export default Register;