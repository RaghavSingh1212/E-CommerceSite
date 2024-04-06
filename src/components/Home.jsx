// Home.jsx
import React from 'react';
import Card from 'react-bootstrap/Card';
import banner from './banner.png';
import Products from './Products';

const Home = () => {
    const scrollToProducts = () => {
        const productsSection = document.getElementById('products-section');
        productsSection.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            {/* Banner Section */}
            <div className="home-banner">
                <Card className="bg-dark text-dark border-0">
                    <Card.Img src={banner} alt="banner" />
                    <Card.ImgOverlay>
                        <div className="container mt-5">
                            {/* Button to scroll down to products section */}
                            <button className='btn btn-outline-light fs-2' onClick={scrollToProducts}>Shop Now <i className='fa fa-shopping-bag'></i></button>
                        </div>
                    </Card.ImgOverlay>
                </Card>
            </div>

            {/* Products Section */}
            <div id="products-section" className="products-section">
                <Products/>
            </div>
        </div>
    );
};

export default Home;
