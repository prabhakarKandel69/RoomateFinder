import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';


const LandingPage = () => {
  return (
    <>
    <Navbar />
      <main className="p-4">
        <h1 className="text-3xl font-bold">Welcome to the Homepage</h1>
        <p className="mt-4">This is the main content of the homepage.</p>
      </main>
    <Footer />
   
    </>
  );
};

export default LandingPage;
