import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AuthOverlay from '../pages/AuthOverlay';
import SearchingPage from '../pages/SearchingPage';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
import Messages from '../pages/Messages';
import PersonalInfo from '../Profilecreation/PersonalInfo';
import ContactInfo from '../Profilecreation/ContactInfo';
import Preferences from '../Profilecreation/Preferences';
import BudgetAndRoom from '../Profilecreation/BudgetAndRoom';
import Summary from '../Profilecreation/Summary';
import Matches from '../pages/Matches';
import Search from '../pages/search';

const AppRouter = () => {

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    age: "",
    gender: "",
    address: "",
    smoking_allowed: false,
    drinking_allowed: false,
    pets_allowed: false,
    early_riser: false,
    vegeterian: false,
    gender_same_prefer: false,
    introvert: false,
    min_budget: "",
    max_budget: "",
    is_looking: false,
    has_room: false,
    room_type: "S",
    description: "",
    profile_pic:null,
  });

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  return (
 
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/" element={<AuthOverlay />} />
        <Route path="/searchingpage" element={<SearchingPage />} />
        <Route path="/profile/:username/:active" element={<Profile />} />  {/* Make sure the path uses :username */}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/messages' element={<Messages />} />
        <Route path='/matches' element={<Matches />} />
        <Route path='/search' element={<Search />} />

       {/* Profile Creation Routes */}
        <Route path="/profile-creation" element={<PersonalInfo formData={formData} updateFormData={updateFormData} />} />
        <Route path="/contact-info" element={<ContactInfo formData={formData} updateFormData={updateFormData} />} />
        <Route path="/preferences" element={<Preferences formData={formData} updateFormData={updateFormData} />} />
        <Route path="/budget-room" element={<BudgetAndRoom formData={formData} updateFormData={updateFormData} />} />
        <Route path="/summary" element={<Summary formData={formData} />} />

      </Routes>
    </Router>
 
  );
};

export default AppRouter;
