import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns"; 
import "../index.css";

function GymBookings() {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [userId, setUserId] = useState(null);

  const timeSlots = [
    "6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
    "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM", "6:00 PM - 7:00 PM",
    "7:00 PM - 8:00 PM"
  ];

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      setUserId(decodedToken.userId); 

      const fetchBookings = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/api/user/${decodedToken.userId}/gym-bookings`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setBookings(response.data);
        } catch (error) {
          console.error('Failed to fetch gym bookings', error);
        }
      };

      fetchBookings();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('User ID:', userId); 
    try {
      const response = await axios.post('http://localhost:8080/api/gym-bookings', {
        userId,
        date,
        timeSlot
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setConfirmationMessage(`Booking confirmed for ${new Date(date).toLocaleDateString()} at ${timeSlot}`);
      setBookings([...bookings, response.data]);
    } catch (error) {
      console.error('Error booking gym time:', error);
      setConfirmationMessage('Failed to book a gym time. Please try again.');
    }
  };

  return (
    <div className="gym-bookings">
      <h2>Book a Gym Time</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="timeSlot">Time Slot:</label>
          <select
            id="timeSlot"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            required
          >
            <option value="">Select a time slot</option>
            {timeSlots.map((slot, index) => (
              <option key={index} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
      <h3>Your Bookings</h3>
      <ul>
        {bookings.map(booking => (
          <li key={booking.id}>
            {format(parseISO(booking.date), "MMMM do, yyyy")} at {booking.timeSlot}
            </li>
        ))}
      </ul>
    </div>
  );
}

export default GymBookings;