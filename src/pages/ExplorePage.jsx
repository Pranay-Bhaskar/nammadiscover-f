import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import GeoSection from '../components/Home/GeoSection';
import DiscoverGrid from '../components/Home/DiscoverGrid';
import MapSection from '../components/Home/MapSection';
import AISection from '../components/Home/AISection';
import BudgetSection from '../components/Home/BudgetSection';
import ItinerarySection from '../components/Home/ItinerarySection';
import BusinessSection from '../components/Home/BusinessSection';
import ReviewSection from '../components/Home/ReviewSection';
import ExplorerSection from '../components/Home/ExplorerSection';
import InvestorSection from '../components/Home/InvestorSection';
import Chatbot from '../components/Chatbot';
import Footer from '../components/Footer';

const Home = () => {
    const location = useLocation();

    // Handle scrollTo passed from Navbar
    useEffect(() => {
        if (location.state?.scrollTo) {
            const sectionId = location.state.scrollTo;
            const timer = setTimeout(() => {
                const el = document.getElementById(sectionId);
                if (el) el.scrollIntoView({ behavior: 'smooth' });
            }, 100);
            window.history.replaceState({}, '');
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    return (
        <div className="home-page">
            <Hero />
            <GeoSection />
            <DiscoverGrid />
            <MapSection />
            <AISection />
            <BudgetSection />
            <ItinerarySection />
            <BusinessSection />
            <ReviewSection />
            <ExplorerSection />
            <InvestorSection />
            <Chatbot />
            <Footer />
        </div>
    );
};

export default Home;
