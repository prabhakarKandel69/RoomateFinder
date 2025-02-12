import React from "react";
import { useNavigate } from "react-router-dom";
import Dnavbar from "../components/Dnavbar";
import Dsnavbar from "../components/Dsnavbar";
import RoommateFilter from "../components/RoommateFilter";

const Search = () => {
  return (
    <div className="bg-primary min-h-screen">
    <Dnavbar active="search" />
    <div className="flex flex-col md:flex-row flex-1">
      {/* Sidebar (Only Visible on Desktop) */}
      <div className="hidden md:flex md:w-1/5 bg-white flex-col justify-between p-4 m-0 md:m-8 rounded-lg shadow-lg">
        <Dsnavbar active="search" />
      </div>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <RoommateFilter />
        </main>
      </div>
    </div>
  );
};

export default Search;
