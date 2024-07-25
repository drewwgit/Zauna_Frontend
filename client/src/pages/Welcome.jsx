import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Zauna from "../assets/Zauna.png"
import maingympicture from "../assets/maingympicture.jpg"
import lobbypicture from "../assets/lobbypicture.jpg"
import saunamainimage from "../assets/saunamainimage.webp"

const sections = [
    {
        id: 1,
        imageUrl: maingympicture,
        title: "The Zauna Lifestyle",
        subtitle: "Experience the world's best luxury gym and sauna experience",
        buttonText: 'Join Now',
        buttonLink: '/register'
    },

    {
        id: 2,
        imageUrl: lobbypicture,
        title: 'Membership with Benefits',
        subtitle: "Say goodbye to the crowds, workout and cleanse your body the right way, on your schedule",
        buttonText: "Learn More About Zauna",
        buttonLink: '/aboutus',
    },

    {
        id: 3,
        imageUrl: saunamainimage,
        title: 'Private Sauna Rooms ',
        subtitle: "Revitalize your body the right way, in one of our state of the art sauna rooms.",
        buttonText: "Learn More About Sauna Benefits",
        buttonLink: '/aboutus',
    },
]

function Welcome() {
  return(
    <div className="home-page">
        {sections.map(section => (
            <div key = {section.id} className = {`section section-${section.id}`} style = {{ backgroundImage: `url(${section.imageUrl})` }}>
                <div className = "overlay">
                    <div className = "content-wrapper">
                    <h1>{section.title}</h1>
                    <p>{section.subtitle}</p>
                    <a href ={section.buttonLink} className="button">{section.buttonText}</a>
                </div>
                </div>
        </div>
        ))}
    <footer className="footer">
        <p>© 2024 Zauna. All rights reserved.</p>
        <ul>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms of Service</a></li>
          <li><a href="/">Back To Top</a></li>
          <li><a href ="#faq">FAQ</a></li>
          <li><a href ="/login">Login</a></li>
        </ul>
    </footer>
    </div>
  );
}

export default Welcome;