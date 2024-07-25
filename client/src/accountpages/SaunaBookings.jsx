import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../index.css"

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import saunahighres from "../assets/sauna-highres.jpg"
import bluecheckmark from "../assets/blue-check-mark.png"

function SaunaBookings() {
    const [bookings, setBookings] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [saunaRooms, setSaunaRooms] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [step, setStep] = useState(1);
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); 


    const timeSlots = [
      "6:00 AM - 7:00 AM", "7:00 AM - 8:00 AM", "8:00 AM - 9:00 AM",
      "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM",
      "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM",
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
          const userId = JSON.parse(atob(token.split('.')[1])).userId;
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

    // handle the clicking of the room and pass Id and also establish the steps 
    const handleRoomClick = (roomId) => {
      setSelectedRoom(roomId);
      setSelectedTimeSlot('');
      setStep(2);
    }

    const handleTimeSlotClick = (timeSlot) => {
      setSelectedTimeSlot(timeSlot);
      setStep(3);
    };

    const handleConfirmBooking = async () => {
      const userId = JSON.parse(atob(token.split('.')[1])).userId; 
      const date = new Date().toISOString().split('T')[0]; 

      try {
        const response = await axios.post('http://localhost:8080/api/sauna-bookings', {
          userId,
          saunaRoomId: selectedRoom,
          date: selectedDate.toISOString().split('T')[0],
          timeSlot: selectedTimeSlot
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setConfirmationMessage(`Booking confirmed for Sauna Room ${selectedRoom} on ${selectedDate.toDateString()} at ${selectedTimeSlot} !`);
        setErrorMessage('');

        setTimeout(() => {
          navigate(0);
        }, 500);

      } catch (error) {
        console.error('Failed to book sauna time', error);
        setErrorMessage(error.response.data.error || 'Failed to book a sauna time. Feel free to try again!');
        setConfirmationMessage('');
      }
    };

    const handleCancelBooking = async (bookingId) => {
      try {
        const response = await axios.delete(`http://localhost:8080/api/sauna-bookings/${bookingId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setConfirmationMessage('Booking cancelled successfully!');
        setBookings(bookings.filter(booking => booking.id !== bookingId));

        setTimeout(() => {
          navigate(0);
        }, 500);
        
      } catch (error) {
        console.error('Failed to cancel the booking', error);
        setErrorMessage('Failed to cancel the booking. Please try again.');
      }
    };

    const handleBack = () => {
      setStep(step-1); 
    }

    const isDateSelectable = (date) => {
      const today = new Date();
      const dayAfterTomorrow = new Date();
      dayAfterTomorrow.setDate(today.getDate() + 2);
      return date >= today && date <= dayAfterTomorrow;
    };

  return (
    <div className="sauna-bookings" >
      <h1>Sauna Booking Page</h1>
      <img src = {saunahighres} alt="saunapicture" height="550px" />
      <div className="current-bookings">
      <h3>My Current Sauna Bookings</h3>
      <ul>
        {bookings.length > 0 ? (
          bookings.map(booking => (
            <li key={booking.id}>
              Sauna Room {booking.saunaRoomId} on {new Date(booking.date).toLocaleDateString()} at {booking.timeSlot}
              <br></br>
              <button onClick={() => handleCancelBooking(booking.id)}>Cancel</button>
            </li>
          ))
        ) : (
          <p>No current Sauna bookings found. Please place a reservation below!</p>
        )}
      </ul>
      </div>

    <div className="book-sauna-time">
    
    { step === 1 && (
     
        <div className="sauna-rooms">
        <h3>Select Your Sauna Room Below to View Available Times</h3>
  
        { step === 1 && (
        <div className="date-selection">
          <label>Select a Date: </label>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            filterDate={isDateSelectable}
            minDate={new Date()}
            maxDate={new Date(new Date().setDate(new Date().getDate() + 2))}
            dateFormat="MMMM d, yyyy"
          />
        </div>
      )}


        {saunaRooms.map(room => (
            <button key={room.id} onClick={() => handleRoomClick(room.id)}>
              Sauna Room: {room.roomNumber}
            </button>
          ))}
      </div>
      )}

    { step === 2 && (
      <div className='overall-timeslots'>
        <h3>Available Time Slots for Sauna Room #{selectedRoom}</h3>
        <div className="time-slots">
          <button onClick ={handleBack}>Back</button>
          {timeSlots.map((slot, index) => (
            <button key = {index} onClick={()=>handleTimeSlotClick(slot)}>
              {slot}
            </button>
          ))}
          <button onClick ={handleBack}>Back</button>
          </div>
          </div>
      )}

    { step === 3 &&  (
        <div className = "confirm-booking">
          <h3>Confirm Booking</h3>
          <img src = {bluecheckmark} height="75px"></img>
          <p> Would you like to book Sauna Room {selectedRoom} at {selectedTimeSlot}?</p>
          <button onClick={handleConfirmBooking}>Confirm</button>
          <button onClick ={handleBack}>Back</button>
          </div>
      )}
    
      {confirmationMessage && <p>{confirmationMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

    </div>
    </div>
  );
};

export default SaunaBookings;