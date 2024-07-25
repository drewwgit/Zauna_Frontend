import ZaunaFull from "../assets/ZaunaFull.jpg"
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Zauna from "../assets/Zauna.png"
function MyAccount({ isLoggedIn }){
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          setError('Login has not been verified, we cannot show user information.');
          return;
        }

        const response = await fetch('http://localhost:8080/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to fetch user data');
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserData();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="account-home">
      <h1>Welcome to your Zauna Profile, {userData.name}!</h1>
      <img src = {Zauna} height = "250px"></img>
      <img src="https://media.istockphoto.com/id/1366052585/photo/shot-of-a-group-of-friends-hanging-out-before-working-out-together.jpg?s=612x612&w=0&k=20&c=rj7LgjUuXde0eLWikS1rvDnsKDdBotgsy9eM5HDzko0=" alt="Group of friends hanging out before working out"></img>
      <h1>Getting Started!</h1>
      <h3>Navigate to the left-hand sidebar to Book A Gym Time, Reserve a Sauna Time, View Your Upcoming Reservations, and Place an order at the Charge Bar!</h3>
    </div>
  );
}

export default MyAccount;