import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import spa from "../assets/spa.jpg"

// import any other dependent files here (ex. checkout)

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate(); 
  const location = useLocation();
  const registrationSuccessMessage = location.state?.registrationSuccessMessage || '';

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("http://localhost:8080/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      console.log("Response data on Login:", data);

    if (response.ok) {
              localStorage.setItem('token', data.token);
              setToken(data.token);
              console.log ("Successfully Logged In!", data.token)
              setSuccessMessage(data.message);
              setEmail("");
              setPassword("");
              navigate("/account");
              setIsLoggedIn(true);
            } else {
              setError(data.message || "Login failed");
            }
          } catch (err) {
            setError(err.message);
          }
        }

  return (
    <div className = "login" style={{ backgroundImage: `url(${spa})` }}>
    <form className = "login-form" onSubmit={handleSubmit}>
    {registrationSuccessMessage&& <p style={{ color: "green" }}>{registrationSuccessMessage}</p>}
      <h2> Login To Your Zauna Membership Account </h2>
      <h3>Enter your Email</h3>
    <input type = "username" value = {email} onChange={(e)=> setEmail(e.target.value)} placeholder={"Enter Your Email"} />
    <h3>Enter Password</h3>
    <input type = "password" value = {password} onChange={(e)=> setPassword(e.target.value)} placeholder={"Password"} />
    <br></br>
    <button type = "submit">Login to Zauna Health & Wellness</button>
    <br></br>
    <Link to={"/register"} className="new-user-reg">New User? Click Here To Register to Zauna</Link>
    </form>
    </div> 
  );
}

export default Login;