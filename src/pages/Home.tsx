import React from 'react';
import CTASection from '../components/public/CTASection';
import HeroSection from '../components/public/HeroSection';
import HowItWorks from '../components/public/HowItWorks';
import ServiceHighlights from '../components/public/ServiceHighlights';
import Testimonials from '../components/public/Testimonials';

const Home: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <HowItWorks />
      <ServiceHighlights />
      <Testimonials />
      <CTASection />
    </div>
  );
};

export default Home;