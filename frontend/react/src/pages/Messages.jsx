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

  return (
    <>
      <div className="bg-primary">
        <Dnavbar />
        <div className="flex flex-col md:flex-row flex-1">
          {/* Sidebar */}
          <div className="w-full min-h-screen md:w-1/5 bg-white flex flex-col justify-between p-4 m-8 rounded-lg shadow-lg">
            <Dsnavbar active="Messages" />
          </div>

          {/* Chat List */}
          <div className="w-full h-screen md:w-1/5 bg-white flex flex-col p-0 m-8 rounded-lg shadow-lg">
            <div className="flex-1">
              <ChatList onUserSelect={handleUserSelect} />
            </div>
          </div>

          {/* Message Area */}
          <div className="flex-grow p-4 ">
            <MessageArea selectedUser={selectedUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
