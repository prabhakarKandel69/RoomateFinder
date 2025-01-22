import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Dnavbar from '../components/Dnavbar';
import Dsnavbar from '../components/Dsnavbar';
import AuthRedirect from '../components/AuthRedirect';
import ChatList from '../sections/ChatList';


const Messages = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 

  return (
    <>
    <AuthRedirect>
      <div className="bg-primary">
        <Dnavbar />
        <div className="flex flex-col md:flex-row flex-1">
          {/* Sidebar */}
          <div className="w-full min-h-screen md:w-1/5 bg-white flex flex-col justify-between p-4 m-8 rounded-lg shadow-lg">
            <Dsnavbar active="Messages" />
          </div>

          <div className="w-full h-[100vh] md:w-1/5 bg-white flex flex-col p-0 m-8 ">
           <div className="flex-1 ">
            <ChatList />
            </div>

          </div>

         

        

            
         


        </div>
      </div>
      </AuthRedirect>
    </>
  );
};

export default Messages;
