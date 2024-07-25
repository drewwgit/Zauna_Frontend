import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function MyProfile({ isLoggedIn }) {
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  if (!token) {
    return (
      <div className="please-login">
        <Link to="/login">Please Login to Zauna to View Account Information</Link>
      </div>
    );
  }

  return (
    <div className="account-information">
      <h2>Your Account Information</h2>
      <button onClick={handleLogout}>Log Out</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {userData ? (
        <div>
          <p><strong>First Name: </strong> {userData.name}</p>
          <p><strong>Email: </strong> {userData.email}</p>
          <p><strong>User ID#: </strong>{userData.id}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MyProfile;