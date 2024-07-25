import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import "../index.css"
import ZaunaWhite from "../assets/ZaunaWhite.png"

const MainAccountPageLayout = ({isLoggedIn}) => {

const token = localStorage.getItem('token');

if (!token) {
  return <div className="please-login" style={{ backgroundImage: `url(https://miro.medium.com/v2/resize:fit:3840/1*uzvCF_EuduV9UyZ2Z3XtUg.jpeg)` }}>
          <div className="please-login-content">
          <h1> My Account Page </h1>
          <img src = {ZaunaWhite} height = "350px" />
          <Link to={"/login"}>Please Login to Zauna to View The My Account Page</Link>
          </div>
        </div>
        ;
}

  
  return (
    <div className="main-layout">
      <aside className="sidebar">
        <ul>
          <li><NavLink to="/account/" end className={({ isActive }) => (isActive ? 'active-link' : '')}>Home - Account Page</NavLink></li>
          <li><NavLink to="/account/gym-bookings" className={({ isActive }) => (isActive ? 'active-link' : '')}>Book A Gym Time</NavLink></li>
          <li><NavLink to="/account/sauna-bookings" className={({ isActive }) => (isActive ? 'active-link' : '')}>Reserve A Sauna Time</NavLink></li>
          <li><NavLink to="/account/upcoming-reservations" className={({ isActive }) => (isActive ? 'active-link' : '')}>Your Upcoming Reservations</NavLink></li>
          <li><NavLink to="/account/order-chargebar" className={({ isActive }) => (isActive ? 'active-link' : '')}>Order From the Recharge Bar</NavLink></li>
          <li><NavLink to="/account/my-profile" className={({ isActive }) => (isActive ? 'active-link' : '')}>My Profile Information</NavLink></li>
        </ul>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default MainAccountPageLayout;