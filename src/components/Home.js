import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Home.css';
import off1 from '../images/off1.jpg';
import off2 from '../images/off2.jpg';
import off3 from '../images/off3.jpg';
import off4 from '../images/off4.jpg';
import off5 from '../images/off5.jpg';

const carouselImages = [off1, off2, off3, off4, off5];

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
        }, 2000);

        return () => clearInterval(interval);
    }, [carouselImages.length, currentImageIndex]);

    function routeChange() {
        history.push('/dashboard');
    }

    return (
        <div className="home-container">
            <div className="row">
                <div className="col-lg-6 text-container">
                    <h1 className="main-heading">Elevate Hiring</h1>
                    <h2 className="sub-heading">Seamlessly Match Talent with Opportunity</h2>
                    <div className="input-group mt-3">
                        <button className="explore-btn" type="button" variant="primary" onClick={routeChange}>
                            Explore
                        </button>
                    </div>
                </div>

                <div className="col-lg-6">
                    <div className='carousel-container'>
                    <div className="circle"></div>
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
