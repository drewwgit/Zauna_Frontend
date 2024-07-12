import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../index.css"

function GymBookings() {
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/gym-bookings');
        setBookings(response.data);
      } catch (error) {
        console.error('Failed to fetch gym bookings', error);
      }
    };

    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/gym-bookings', {
        userId: 1,
        date,
        timeSlot
      });

      const formattedDate = new Date(response.data.date).toLocaleDateString();
      const formattedTime = new Date(response.data.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setConfirmationMessage(`Booking confirmed for ${formattedDate} at ${formattedTime}`);
      setBookings([...bookings, response.data]);
    } catch (error) {
      setConfirmationMessage('Failed to book a gym time. Please try again.');
    }
  };

  return (
    <div className="gym-bookings">
    <img src ="https://www.charlotteobserver.com/latest-news/wcmkjr/picture284543285/alternates/FREE_1140/mja09349.jpeg" height="600px"></img>
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
            <option value="6:00 AM - 7:00 AM">6:00 AM - 7:00 AM</option>
            <option value="7:00 AM - 8:00 AM">7:00 AM - 8:00 AM</option>
            <option value="8:00 AM - 9:00 AM">8:00 AM - 9:00 AM</option>
            <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
            <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
            <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
            <option value="1:00 PM - 2:00 PM">1:00 PM - 2:00 PM</option>
            <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
            <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
            <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
            <option value="6:00 PM - 7:00 PM">6:00 PM - 7:00 PM</option>
            <option value="7:00 PM - 8:00 PM">7:00 PM - 8:00 PM</option>
          </select>
        </div>
        <button type="submit">Book Now</button>
      </form>
      {confirmationMessage && <p>{confirmationMessage}</p>}
      <h3>Existing Bookings</h3>
      <ul>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <li key={booking.id}>
              {new Date(booking.date).toLocaleDateString()} at {new Date(booking.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </li>
          ))
        ) : (
          <p>No bookings found.</p>
        )}
      </ul>
    </div>
  );
};

export default GymBookings;