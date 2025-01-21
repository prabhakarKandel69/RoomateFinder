import React, { useState } from "react";

const users = [
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak fgdfgdfgdfgv dfgfdg dfgfd",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak...",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak fgdfgdfgdfgv dfgfdg dfgfd",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak...",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak fgdfgdfgdfgv dfgfdg dfgfd",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak...",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak fgdfgdfgdfgv dfgfdg dfgfd",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak...",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak fgdfgdfgdfgv dfgfdg dfgfd",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak...",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak fgdfgdfgdfgv dfgfdg dfgfd",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak...",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak fgdfgdfgdfgv dfgfdg dfgfd",
    avatar: "https://via.placeholder.com/40",
  },
  {
    name: "Aakash Raj Jha",
    message: "Chin tapak dam dam, Chin tapak...",
    avatar: "https://via.placeholder.com/40",
  },
  // Additional users omitted for brevity
];

const ChatList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-xs md:max-w-md bg-white p-4 flex flex-col">
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
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full mr-3"
            />
            <div className="flex flex-col overflow-hidden">
              <p className="font-semibold text-sm">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
