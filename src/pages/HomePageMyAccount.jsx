import React from "react";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import MyAccount from "./MainAccountContent";

// import any other dependent files here (ex. checkout)

function HomePageMyAccount() {
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <ul>
          <li><Link to="/-myaccount">Home - Account Page</Link></li>
          <li><Link to="/book-gym">Book A Gym Time</Link></li>
          <li><Link to="/reserve-sauna">Reserve A Sauna Time</Link></li>
          <li><Link to="/upcoming-reservations">Your Upcoming Reservations</Link></li>
          <li><Link to="/order-charge-bar">Order From the Charge Bar</Link></li>
          <li><Link to="/your-orders">Your Orders</Link></li>
          <li><Link to="/profile">My Profile Information</Link></li>
        </ul>
      </aside>
      <main className="content">
        <MyAccount />
      </main>
    </div>
  );
};

export default HomePageMyAccount;