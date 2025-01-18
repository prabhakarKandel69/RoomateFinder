import React from "react";

const DashboardCards = () => {
  const cards = [
    {
      title: "Total Messages",
      value: 20,
      percentage: "+20% from last month",
      icon: "💬",
    },
    {
      title: "Total Matches",
      value: 31,
      percentage: "+21% from last month",
      icon: "💎",
    },
    {
      title: "Profile Views",
      value: 57,
      percentage: "10 new this week",
      icon: "👁️",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col"
        >
          <div className="flex justify-between items-center">
            <h2 className="text-secondary font-bold font-inter">{card.title}</h2>
            <span className="text-gray-400 text-lg">{card.icon}</span>
          </div>
          <div className="mt-2">
            <h3 className="text-3xl font-bold text-gray-800">{card.value}</h3>
            <p className="text-sm text-gray-500 mt-1">{card.percentage}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
