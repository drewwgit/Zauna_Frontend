import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns"; 


function UpcomingReservations(){
  const [userId, setUserId] = useState(null);
  const [gymBookings, setGymBookings] = useState([]);
  const [saunaBookings, setSaunaBookings] = useState([]);


   useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.userId); 

      const fetchGymBookings = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${decodedToken.userId}/gym-bookings`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setGymBookings(response.data);
        } catch (error) {
          console.error('Failed to fetch Gym bookings', error);
        }
      };

      const fetchSaunaBookings = async () => {
        try {
          const userId = JSON.parse(atob(token.split('.')[1])).userId; // Decode token to get userId
          const response = await axios.get(`http://localhost:8080/api/user/${userId}/sauna-bookings`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setSaunaBookings(response.data);
        } catch (error) {
          console.error('Failed to fetch Sauna bookings', error);
        }
      };

      fetchSaunaBookings();
      fetchGymBookings();
    }
  }, []);



  return (
    <div className="upcoming-reservations">
      <h1>Welcome to your Upcoming Reservations Page!</h1>
      <div className = "reservations-gym-bookings">
      <h3>Your Gym Bookings</h3>
      <ul>
        {gymBookings.map(booking => (
          <li key={booking.id}>
            {format(parseISO(booking.date), "MMMM do, yyyy")} at {booking.timeSlot}
            </li>
        ))}
      </ul>
      </div>
      <div className = "reservations-sauna-bookings">

      <h3>My Sauna Room Current Bookings</h3>
      <ul>
        {saunaBookings.length > 0 ? (
          saunaBookings.map(booking => (
            <li key={booking.id}>
              Your Booking is set for Sauna Room {booking.saunaRoomId} on {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
            </li>
          ))
        ) : (
          <p>No current bookings found.</p>
        )}
      </ul>
      </div>
    </div>
  );
};

export default UpcomingReservations;