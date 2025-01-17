import React from "react";

const DashboardLists = () => {
  const recentActivities = [
    {
      user: "User 1",
      activity: "viewed your profile",
      time: "2 hours ago",
      avatar: "https://via.placeholder.com/40", // Replace with actual image URLs
    },
    {
      user: "User 2",
      activity: "viewed your profile",
      time: "3 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
    {
      user: "User 3",
      activity: "sent you a message",
      time: "3 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
    {
      user: "User 4",
      activity: "viewed your profile",
      time: "4 hours ago",
      avatar: "https://via.placeholder.com/40",
    },
  ];

  const matches = [
    {
      user: "User 1",
      matchPercentage: "95% Match",
      priceRange: "Rs 10000 - Rs 12000",
      avatar: "https://via.placeholder.com/40", // Replace with actual image URLs
    },
    {
      user: "User 1",
      matchPercentage: "95% Match",
      priceRange: "Rs 10000 - Rs 12000",
      avatar: "https://via.placeholder.com/40",
    },
    {
      user: "User 1",
      matchPercentage: "95% Match",
      priceRange: "Rs 10000 - Rs 12000",
      avatar: "https://via.placeholder.com/40",
    },
    {
      user: "User 1",
      matchPercentage: "95% Match",
      priceRange: "Rs 10000 - Rs 12000",
      avatar: "https://via.placeholder.com/40",
    },
    {
        user: "User 1",
        matchPercentage: "95% Match",
        priceRange: "Rs 10000 - Rs 12000",
        avatar: "https://via.placeholder.com/40",
      },
      {
        user: "User 1",
        matchPercentage: "95% Match",
        priceRange: "Rs 10000 - Rs 12000",
        avatar: "https://via.placeholder.com/40",
      },
  ];

  return (
    <div className="flex  gap-6  mt-6 h-80">
      {/* Recent Activities Section */}
      
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-0">
      
      <div className="w-full flex flex-col items-center sticky top-0 bg-secondary z-10 rounded-lg">
            <hr className="my-1 w-full border-gray-300" />
              <h1 className="  font-semibold font-inter text-white  px-4  rounded-md">
                Recent Activities
              </h1>
              <hr className="my-1 w-full border-gray-300" />
      </div>
      <div className="h-64 overflow-auto hide-scrollbar"> 

        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index} className="flex items-center gap-4 mb-4 ml-5 ">
              <img
                src={activity.avatar}
                alt={activity.user}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-1">
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{activity.user}</span>{" "}
                  {activity.activity}
                </p>
                <p className="text-xs text-gray-500">{activity.time}</p>
              </div>
            </li>
          ))}
        </ul>
        </div>
      </div>

      {/* Matches Section */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-0">
            <div className="w-full flex flex-col items-center sticky top-0 bg-secondary z-10 rounded-lg">
                    <hr className="my-1 w-full border-gray-300" />
                    <h1 className="   font-semibold font-inter text-white  px-4  rounded-md">
                        Matches
                    </h1>
                    <hr className="my-1 w-full border-gray-300" />
            </div>

        <div className="h-64 overflow-auto hide-scrollbar"> 
        <ul>
          {matches.map((match, index) => (
           
            <li
              key={index}
              className="flex items-center justify-between gap-4 mb-4 ml-5"
            >
              <div className="flex items-center gap-4">
                <img
                  src={match.avatar}
                  alt={match.user}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <p className="text-sm text-gray-700 font-semibold">
                    {match.user}
                  </p>
                  <p className="text-xs text-gray-500">{match.matchPercentage}</p>
                  <p className="text-xs text-gray-500">{match.priceRange}</p>
                </div>
              </div>
              <button className="bg-blue-500 text-white text-sm px-4 py-2 mr-5 rounded-lg hover:bg-blue-600">
                Message
              </button>
            </li>
           
          ))}
        </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLists;
