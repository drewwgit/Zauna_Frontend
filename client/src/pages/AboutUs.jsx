import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import eucalyptustowel from "../assets/eucalyptus-towel.jpg"
import saunawoman from "../assets/sauna-woman.webp"


const sections = [
    {
        id: 1,
        imageUrl: eucalyptustowel,
        title: "Why Zauna?",
        subtitle: "Our luxury gym and sauna all-in-one establishment offers unparalleled convenience and exclusivity for fitness enthusiasts and wellness seekers! By combining state-of-the-art workout facilities with private sauna rooms, our business allows individuals to tailor their fitness and relaxation routines to their personal preferences. Booking private workout sessions ensures a focused and uninterrupted exercise experience, while the availability of individual sauna rooms provides a serene space for post-workout recovery or relaxation. This seamless integration not only enhances the overall fitness experience but also promotes holistic well-being, offering a sanctuary where users can achieve their health goals in a luxurious and private setting.",
        buttonText: 'Join The Zauna Lifestyle Today!',
        buttonLink: '/register'
    },

    {
        id: 2,
        imageUrl: saunawoman,
        title: 'Sauna Benefits',
        subtitle: "Physically, nothing is more reinvigorating than a deep, healthy sweat every day. Tension fades. Muscles unwind. And you emerge relaxed, revived, and ready for whatever the day may bring. A few minutes a day is all it takes to look and feel better. The body's response to gentle, persistent heat is well-documented and proven day-in and day-out by people all over the world. Which is why more and more doctors are recommending sauna and its purifying benefits.",
        buttonText: "Book Sauna Time With Us Today!",
        buttonLink: '/login',
    },
    {
        id: 3,
        imageUrl: "https://static.vecteezy.com/system/resources/previews/040/724/395/non_2x/ai-generated-tranquil-forest-clearing-golden-sunlight-soothing-stream-relaxing-hammock-strong-trees-dreamy-ambiance-perfect-for-selfreflection-free-photo.jpg",
        title: 'Membership Pricing & Plans ',
        subtitle: "You can come a Zauna Member for $42.99 a month. This flat fee allows you unlimited access to gym & sauna sessions! Learn why Zauna has over 150,000 members globally!",
        buttonText: "Sign Up For Zauna Today!",
        buttonLink: '/register',
    },
]


function AboutUs() {
  return(
    <div className="about-us-page">
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

export default AboutUs;