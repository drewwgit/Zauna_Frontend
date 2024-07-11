import { useState } from 'react'
import {Route, Router, Routes} from "react-router-dom"
import React from "react";
import './index.css'
import Welcome from './pages/Welcome';
import Nav from './components/Nav';
import Register from './pages/Register';
import Login from './pages/Login';
import MyAccount from './pages/HomePageMyAccount'
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import HomePageMyAccount from './pages/HomePageMyAccount';


function App() {

  return (
    <>
      <Nav />

      <Routes>
          <Route index element ={<Welcome />} />
          <Route path ="/aboutus" element ={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-account" element={<HomePageMyAccount />} />
          <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </>
  );
}

export default App
