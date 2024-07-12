import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import "../index.css"

function SaunaBookings(){
    const [saunaRooms, setSaunaRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [availableTimeslots, setAvailableTimeSlots] = useState([]);

    useEffect(() => {
      fetchSaunaRooms();
    }, []);

    const fetchSaunaRooms = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/sauna-rooms');
        setSaunaRooms(response.data);
      } catch (error) {
        console.error('Failed to fetch sauna rooms', error);
      }
    };

    // const handleRoomClick = async (roomId) => {
    //   try {
        
    //   }
    // }

  return (
    <div className="sauna-bookings">
      <h1>Welcome to your Zauna Sauna Bookings Page!</h1>
      <img src = "https://images.ctfassets.net/r7p9m4b1iqbp/5DdByuBLVsDkyPqZVAPMGn/e1c084b1b51e032a01d91cf880680317/personal-sauna-sun-homes.jpeg?w=600&q=85&fm=jpg&fl=progressive"></img>
      <h2>Book Sauna Rooms</h2>
      <div>
        <h3>Select Your Sauna Room Below to View Available Times</h3>
        <div className="sauna-rooms"> 
        {saunaRooms.map(room => (
            <button key={room.id} onClick={() => handleRoomClick(room.id)}>
              Sauna Room: {room.roomNumber}
            </button>
          ))}
      </div>
    </div>
    </div>
  );
};

export default SaunaBookings;