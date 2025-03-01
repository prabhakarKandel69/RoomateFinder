import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import Dnavbar from "../components/Dnavbar";
import Dsnavbar from "../components/Dsnavbar";
import ProfileCard from "../sections/ProfileCard";
import Suggestions from "../sections/Suggestions";
import DashboardCards from "../sections/DashboardCards";
import DashboardLists from "../sections/DashboardLists";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes] = await Promise.all([api.get("api/profile/")]);

        setUserData(profileRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
        setLoading(false);

        if (err.response && err.response.status === 401) {
          navigate("/"); // Redirect to login if unauthorized
        }
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div className="bg-primary min-h-screen">
      <Dnavbar active="Dashboard" />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar (Only Visible on Desktop) */}
        <div className="hidden md:flex md:w-1/5 bg-white flex-col justify-between p-4 m-0 md:m-8 rounded-lg shadow-lg">
          <Dsnavbar active="Dashboard" />
        </div>

        {/* Profile Card & Dashboard Content */}
        <div className="flex-1 m-0 md:m-4 p-4">
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {userData && <ProfileCard userData={userData} />}
          <DashboardCards data={dashboardData} />
          <DashboardLists userData={userData} />
        </div>

        {/* Suggestions Section (Below Content on Mobile, Side on Desktop) */}
        <div className="w-full md:w-1/5 bg-white flex flex-col p-4 m-0 md:m-8 rounded-lg shadow-lg overflow-auto hide-scrollbar">
          <div className="w-full flex flex-col items-center sticky top-0 bg-secondary z-10">
            <hr className="my-2 w-full border-gray-300" />
            <h1 className="text-2xl font-semibold font-inter text-white px-4 rounded-md">
              Suggestions
            </h1>
            <hr className="my-2 w-full border-gray-300" />
          </div>
          <div className="flex-1">
            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
