import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dnavbar from '../components/Dnavbar';
import Dsnavbar from '../components/Dsnavbar';
import ChatList from '../sections/ChatList';
import MessageArea from '../sections/Messagearea';

const Messages = () => {
  const [selectedUser, setSelectedUser] = useState(null); // Track selected user
  const navigate = useNavigate();

  const handleUserSelect = (user) => {
    setSelectedUser(user); // Set selected user
  };

  const handleBack = () => {
    setSelectedUser(null); // Go back to chat list
  };

  return (
    <>
      <div className="bg-primary min-h-screen">
      <Dnavbar active="Messages" />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar (Only Visible on Desktop) */}
        <div className="hidden md:flex md:w-1/5 bg-white flex-col justify-between p-4 m-0 md:m-8 rounded-lg shadow-lg">
          <Dsnavbar active="Messages" />
        </div>

          {/* Chat List - Always visible on large screens */}
          <div className={`w-full  md:w-1/5 bg-white flex p-2 md:m-8 m-1 rounded-lg shadow-lg ${selectedUser ? 'hidden md:block' : ''}`}>
            <ChatList onUserSelect={handleUserSelect} />
          </div>

          {/* Message Area - Fullscreen on Mobile when open */}
          {selectedUser && (
            <div className="md:flex-grow md:m-4 m-2">
            <MessageArea selectedUser={selectedUser} onBack={handleBack} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Messages;
