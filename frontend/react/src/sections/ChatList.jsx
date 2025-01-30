import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ChatList = ({ onUserSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchedUsers = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:7999/matches/matched/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matched users:', error);
        setError('Failed to load matched users.');
        setLoading(false);
      }
    };

    fetchMatchedUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.first_name &&
      typeof user.first_name === 'string' &&
      user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="w-full h-screen max-w-xs md:max-w-md bg-white p-4 flex flex-col">
      <div className="w-full flex flex-col items-center sticky top-0 z-10 bg-white pb-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>
      <div className="space-y-2 overflow-y-auto max-h-[89vh] hide-scrollbar">
        {filteredUsers.map((user, index) => (
          <div
            key={index}
            className="flex items-center p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={() => onUserSelect(user)} // Pass the selected user
          >
            <img
              src={`http://127.0.0.1:7999${user.profile_pic}`}
              alt={user.first_name}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
            <div className="flex flex-col overflow-hidden">
              <p className="font-semibold text-sm">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
