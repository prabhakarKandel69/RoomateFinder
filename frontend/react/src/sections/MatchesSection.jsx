import React from "react";
import Card from "../components/Card";

const MatchesSection = ({ matches = [] }) => {
  return (
    <section className="py-12 bg-[#E7F8FD]">
      <div className="flex flex-wrap justify-center gap-4">
        {matches.length > 0 ? (
          matches.map((match, index) => (
            <Card
              key={index}
              username={match.username}
              // {match.desc}
              address={match.address}
              profile_pic={match.profile_pic}
              min_budget={match.min_budget}
              max_budget={match.max_budget}
            />
          ))
        ) : (
          <div className="text-gray-500 text-center w-full py-10">
            <p className="text-lg text-red-600">No Matches Found</p>
            <p className="text-sm">Try adjusting the filters to find roommates.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default MatchesSection;
