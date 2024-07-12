import { useState } from 'react'
import {Route, Router, Routes} from "react-router-dom"
import React from "react";
import './index.css'
import Welcome from './pages/Welcome';
import Nav from './components/Nav';
import Register from './pages/Register';
import Login from './pages/Login';
import MyAccount from './accountpages/MyAccount'
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import GymBookings from './accountpages/GymBookings';
import MainAccountPageLayout from './accountpages/HomePageMyAccount';
import SaunaBookings from './accountpages/SaunaBookings';
import UpcomingReservations from './accountpages/UpcomingReservations';
import OrderChargeBar from './accountpages/OrderChargeBar';
import MyProfile from './accountpages/MyProfile';


function App() {
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/account" element={<MainAccountPageLayout />}>
          <Route index="/" element={<MyAccount />} />
          <Route path="gym-bookings" element={<GymBookings />} />
          <Route path="sauna-bookings" element={<SaunaBookings />} />
          <Route path="upcoming-reservations" element={<UpcomingReservations />} />
          <Route path="order-chargebar" element={<OrderChargeBar />} />
          <Route path="my-profile" element={<MyProfile />} />
        </Route>
      </Routes>
      </>
  );
}

export default App
