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


function App({userId}) {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  
  
  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/account/" element={<MainAccountPageLayout isLoggedIn={isLoggedIn} />}>
          <Route index="/" element={<MyAccount isLoggedIn={isLoggedIn}/>} />
          <Route path="gym-bookings" element={<GymBookings />}isLoggedIn={isLoggedIn} />
          <Route path="sauna-bookings" element={<SaunaBookings />} isLoggedIn={isLoggedIn} />
          <Route path="upcoming-reservations" element={<UpcomingReservations />} isLoggedIn={isLoggedIn} />
          <Route path="order-chargebar" element={<OrderChargeBar />} isLoggedIn={isLoggedIn} />
          <Route path="my-profile" element={<MyProfile />} isLoggedIn={isLoggedIn} />
        </Route>
      </Routes>
      </>
  );
}

export default App
