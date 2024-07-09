import React from 'react';
import AppHeader from '../components/header/header';
import SociosLandingPage from '../components/socios/socioslandingpage';
import About from '../components/about/about';
import Footer from '../components/footer/footer';

const Home = () => {
    return (
        <div>
            <AppHeader />
            <SociosLandingPage />
            <About />
            <Footer />
        </div>
    );
};

export default Home;
