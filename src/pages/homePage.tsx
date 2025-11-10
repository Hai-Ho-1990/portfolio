import React from 'react';
import HeaderComponent from '../components/header/headerComponent';
import FooterComponent from '../components/footer/footerComponent';
import { useSmoothScroll } from '../components/hook/smoothScroll';
import About from '../components/About';

const HomePage: React.FC = () => {
  useSmoothScroll();

  return (
    <div>
      <HeaderComponent />

      <About />
      <FooterComponent />
    </div>
  );
};

export default HomePage;
