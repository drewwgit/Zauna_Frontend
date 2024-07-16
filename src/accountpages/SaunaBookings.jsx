import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css"

function SaunaBookings() {
    const [bookings, setBookings] = useState([]);
    const [saunaRooms, setSaunaRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); 


    const timeSlots = [
      "6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM",
      "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
      "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "3:00 PM - 4:00 PM",
      "4:00 PM - 5:00 PM", "5:00 PM - 6:00 PM", "6:00 PM - 7:00 PM",
      "7:00 PM - 8:00 PM"
    ];

    useEffect(() => {
      const fetchSaunaRooms = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/sauna-rooms/', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setSaunaRooms(response.data);
        } catch (error) {
          console.error('Failed to fetch sauna rooms', error);
        }
      };

      const fetchBookings = async () => {
        try {
          const userId = JSON.parse(atob(token.split('.')[1])).userId; // Decode token to get userId
          const response = await axios.get(`http://localhost:8080/api/user/${userId}/sauna-bookings`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          setBookings(response.data);
        } catch (error) {
          console.error('Failed to fetch bookings', error);
        }
      };
      

      fetchSaunaRooms();
      fetchBookings();

    }, [token]);

    // handle the clicking of the room and pass Id
    const handleRoomClick = (roomId) => {
      setSelectedRoom(roomId);
      setSelectedTimeSlot('');
    }

    const handleTimeSlotClick = (timeSlot) => {
      setSelectedTimeSlot(timeSlot);
    };

    const handleConfirmBooking = async () => {
      const userId = JSON.parse(atob(token.split('.')[1])).userId; 
      const date = new Date().toISOString().split('T')[0]; 

      try {
        const response = await axios.post('http://localhost:8080/api/sauna-bookings', {
          userId,
          saunaRoomId: selectedRoom,
          date,
          timeSlot: selectedTimeSlot
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setConfirmationMessage(`Booking confirmed for Sauna Room ${selectedRoom} at ${selectedTimeSlot} !`);

        setTimeout(() => {
          navigate(0);
        }, 2000);

      } catch (error) {
        console.error('Failed to book sauna time', error);
        setConfirmationMessage('Failed to book a sauna time. Feel free to try again!');
      }
    };

  return (
    <div className="sauna-bookings">
      <h1>Welcome to your Zauna Sauna Bookings Page!</h1>
      <img src = "https://images.ctfassets.net/r7p9m4b1iqbp/5DdByuBLVsDkyPqZVAPMGn/e1c084b1b51e032a01d91cf880680317/personal-sauna-sun-homes.jpeg?w=600&q=85&fm=jpg&fl=progressive"></img>
      <h2>Book Sauna Rooms</h2>
      <div className="book-sauna-time">
        <div className="sauna-rooms"> 
        <h3>Select Your Sauna Room Below to View Available Times</h3>
        {saunaRooms.map(room => (
            <button key={room.id} onClick={() => handleRoomClick(room.id)}>
              Sauna Room: {room.roomNumber}
            </button>
          ))}
      </div>
      {selectedRoom && (
        <div className="time-slots">
          <h3> Available Time Slots for Sauna Room #{selectedRoom} </h3>
          {timeSlots.map((slot, index) => (
            <button key = {index} onClick={()=>handleTimeSlotClick(slot)}>
              {slot}
            </button>
          ))}
          </div>
      )}
      {selectedTimeSlot && (
        <div className = "confirm-booking">
          <h3>Confirm Booking</h3>
          <p> Would you like to book Sauna Room {selectedRoom} at {selectedTimeSlot}?</p>
          <button onClick={handleConfirmBooking}>Confirm</button>
          </div>
      )}
      {confirmationMessage && <p>{confirmationMessage}</p>}

      <div className="current-bookings">
      <h3>My Current Bookings</h3>
      <ul>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <li key={booking.id}>
              Sauna Room {booking.saunaRoomId} on {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
            </li>
          ))
        ) : (
          <p>No current bookings found.</p>
        )}
      </ul>
      </div>
    </div>
    </div>
  );
};

export default SaunaBookings;