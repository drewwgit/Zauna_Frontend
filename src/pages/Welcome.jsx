import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Zauna from "../assets/Zauna.png"

// import any other dependent files here (ex. checkout)

function Welcome() {
  return(
    <div className="home-container">
    <header className="header">
        <h1>Welcome to the Zauna Lifestyle - Home of All of your Gym & Sauna Needs</h1>
        <p>Your health and wellness journey starts here.</p>
    </header>

    <section className="benefits-section">
        <h2>Benefits of Health & Wellness</h2>
        <div className="benefit">
            <h3>Physical Fitness</h3>
            <p>Improve your strength, flexibility, and endurance.</p>
        </div>
        <div className="benefit">
            <h3>Mental Wellbeing</h3>
            <p>Reduce stress and improve your mood.</p>
        </div>
        <div className="benefit">
            <h3>Overall Health</h3>
            <p>Boost your immune system and increase longevity.</p>
        </div>
    </section>
    </div>
  ) 
}

export default Welcome;