import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const DashboardLists = () => {
  const [matches, setMatches] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  // Fetch Matches
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7999/matches/matched/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7999/notifications/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        // Map API response to recentActivities format
        const activities = response.data.map((activity) => ({
          user: activity.user2_username,
          activity: activity.notification_action,
          time: activity.time,
          avatar: "https://via.placeholder.com/40", // Replace if avatar exists
        }));

        setRecentActivities(activities);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

    if (accessToken) {
      fetchMatches();
      fetchActivities();
    }
  }, [accessToken]);

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6">
      {/* Recent Activities */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-0">
        <div className="w-full flex flex-col items-center sticky top-0 bg-secondary z-10 rounded-t-lg">
          <hr className="my-1 w-full border-gray-300" />
          <h1 className="font-semibold font-inter text-white px-4">Recent Activities</h1>
          <hr className="my-1 w-full border-gray-300" />
        </div>
        <div className="h-64 overflow-auto hide-scrollbar p-4">
          <ul>
            {recentActivities.length > 0 ? (
              recentActivities.map((activity, index) => (
                <li key={index} className="flex items-center gap-4 mb-4">
                  {/* <img
                    src={activity.avatar}
                    alt={activity.user}
                    className="w-10 h-10 rounded-full"
                  /> */}
                  <div>
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">{activity.user}</span> {activity.activity}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No recent activities</p>
            )}
          </ul>
        </div>
      </div>

      {/* Matches Section */}
      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-0">
        <div className="w-full flex flex-col items-center sticky top-0 bg-secondary z-10 rounded-t-lg">
          <hr className="my-1 w-full border-gray-300" />
          <h1 className="font-semibold font-inter text-white px-4">Matches</h1>
          <hr className="my-1 w-full border-gray-300" />
        </div>
        <div className="h-64 overflow-auto hide-scrollbar p-4">
          <ul>
            {matches.length > 0 ? (
              matches.map((match, index) => (
                <li key={index} className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={match.profile_pic ? `http://127.0.0.1:7999${match.profile_pic}` : "https://via.placeholder.com/40"}
                      alt={match.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm text-gray-700 font-semibold">{match.first_name || 'admin'}</p>
                      {/* <p className="text-xs text-gray-500">{match.matchPercentage}% Match</p> */}
                      <p className="text-xs text-gray-500">${match.min_budget} - ${match.max_budget}</p>
                    </div>
                  </div>
                  <Button
                    label="Message"
                    className="bg-secondary text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => navigate(`/chat/${match.username}`)}
                  />
                </li>
              ))
            ) : (
              <p className="text-sm text-gray-500">No matches found</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLists;
