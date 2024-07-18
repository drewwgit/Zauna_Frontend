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
        subtitle: "Say goodbye to the crowds, workout and cleanse your body the right way",
        buttonText: "Learn More About Zauna",
        buttonLink: '/aboutus',
    },

    {
        id: 3,
        imageUrl: saunamainimage,
        title: 'Private Sauna Rooms ',
        subtitle: "Rejuvenate your body the right way. Privately",
        buttonText: "Learn More About Sauna Benefits",
        buttonLink: '#sauna',
    },
]

function Welcome() {
  return(
    <div className="home-page">
        {sections.map(section => (
            <div key = {section.id} className="section" style = {{ backgroundImage: `url(${section.imageUrl})` }}>
                <div className = "overlay"> 
                    <h1>{section.title}</h1>
                    <p>{section.subtitle}</p>
                    <a href ={section.buttonLink} className="button">{section.buttonText}</a>
                </div>
        </div>
        ))}
    <footer className="footer">
        <p>© 2024 Zauna. All rights reserved.</p>
        <ul>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms of Service</a></li>
          <li><a href="/">Back To Top</a></li>
        </ul>
    </footer>
    </div>
  );
}

export default Welcome;