import { useState } from 'react'
import {Route, Router, Routes} from "react-router-dom"
import React from "react";
import './index.css'
import Welcome from './pages/Welcome';
import Nav from './components/Nav';

function App() {

  return (
    <>
      <Nav />

      <Routes>
          <Route index element ={<Welcome />} />
          
      </Routes>
    </>
  );
}

export default App
