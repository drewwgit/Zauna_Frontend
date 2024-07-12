import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "../index.css"

const MainAccountPageLayout = () => {
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <ul>
          <li><Link to="/account/"> Home - Account Page</Link></li>
          <li><Link to="/account/gym-bookings">Book A Gym Time</Link></li>
          <li><Link to="/account/sauna-bookings">Reserve A Sauna Time</Link></li>
          <li><Link to="/account/upcoming-reservations">Your Upcoming Reservations</Link></li>
          <li><Link to="/account/order-chargebar">Order From the Charge Bar</Link></li>
          <li><Link to="/account/my-profile">My Profile Information</Link></li>
        </ul>
      </aside>
      <main className="content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainAccountPageLayout;