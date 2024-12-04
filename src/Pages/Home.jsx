import React from "react";
import Banner from "../Components/Home/Banner/Banner";
import CollectionBox from "../Components/Home/Collection/CollectionBox";
import Services from "../Components/Home/Services/Services";
import Instagram from "../Components/Home/Instagram/Instagram";
import Trendy from "../Components/Home/Trendy/Trendy";
import LimitedEdition from "../Components/Home/Limited/LimitedEdition";
import DealTimer from "../Components/Home/Deal/DealTimer";
import HeroSection from "../Components/Home/Hero/HeroSection";
import Header from "../Components/Header/Navbar";
import Footer from "../Components/Footer/Footer";
import Popup from "../Components/PopupBanner/Popup";

const Home = () => {
  return (
    <>
      <Popup />
      <Header />
      <HeroSection />
      <CollectionBox />
      <Trendy />
      <DealTimer />
      <Banner />
      <LimitedEdition />
      <Instagram />
      <Services />
      <Footer />
    </>
  );
};

export default Home;
