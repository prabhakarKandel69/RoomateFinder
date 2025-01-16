import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from "./Icon";
import Button from "./Button";





const Dsnavbar = ({ active }) => {

    const navigate = useNavigate(); // React Router hook for navigation

    const [activeButton, setActiveButton] = useState(active); // Default active button
    const handleNavigation = (button, path) => {
        setActiveButton(button); // Set the active button
        navigate(path); // Navigate to the desired path
      };

  return (
    <>
     <div>
        <Button
          label="Dashboard"
          icon={<span className="mr-2">👤</span>}
          isActive={activeButton === 'Dashboard'}
          className="w-full mb-2 px-5 py-3 rounded-lg "
          onClick={() => handleNavigation('Dashboard', '/dashboard')}
        />
        <Button
          label="Messages"
          icon={<span className="mr-2">💬</span>}
          isActive={activeButton === 'Messages'}
          className="w-full mb-2 px-5 py-3 rounded-lg"
          onClick={() => handleNavigation('Messages', '/messages')}
        />
        <Button
          label="Settings"
          icon={<span className="mr-2">⚙️</span>}
          isActive={activeButton === 'Settings'}
          className="w-full px-5 py-3 rounded-lg"
          onClick={() => handleNavigation('Settings', '/settings')}
        />
      </div>

      {/* Bottom Section */}
      <Button
        label="Log Out"
        icon={<span className="mr-2">↩️</span>}
        isActive={activeButton === 'Log Out'}
        className="w-full px-5 py-3 rounded-lg"
        onClick={() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          navigate('/'); // Navigate using React Router
        }}
      />
    
 </>
  );
};

export default Dsnavbar;
