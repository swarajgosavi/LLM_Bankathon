// Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import companyLogo from '../images/company-logo.png';
import off1 from '../images/off1.jpg';
import off2 from '../images/off2.jpg';
import off3 from '../images/off3.jpg';
import off4 from '../images/off4.jpg';
import off5 from '../images/off5.jpg';

const carouselImages = [off1, off2, off3, off4, off5];

const Home = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [prevImageIndex, setPrevImageIndex] = useState(carouselImages.length - 1);

    // Images for carousel
    // const carouselImages = [off1, off2, off3, off4, off5];

    // Function to switch images every 2 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setPrevImageIndex(currentImageIndex);
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 2000);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [carouselImages.length, currentImageIndex]);

    const loggedInUser = null;

    return (
        <div className="container">


            {/* Main content */}
            <div className="row">
                {/* Left part */}
                <div className="col-lg-6">
                    <div className="text-container d-flex flex-column align-items-center justify-content-center h-100">
                        <h1 className="display-4 text-center">Some Tagline</h1>
                        <h2 className="text-center">Find Your Next Job</h2>
                        <div className="input-group mt-3">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for jobs..."
                            />
                            <div className="input-group-append">
                                <button className="btn btn-primary" type="button">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right part */}
                <div className="col-lg-6">
                    <div className='carousel-container'>
                    {/* Carousel */}
                    <div className="carousel-frame">
                        {carouselImages.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                alt={`Carousel Image ${index + 1}`}
                                className={`carousel-img ${index === currentImageIndex ? 'active' : ''}`}
                            />
                        ))}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
