import { useEffect, useState } from "react";
import axios from "axios";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const Suggestions = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate(); // Use navigate function
  const accessToken = localStorage.getItem("accessToken"); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:7999/matches/", {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Sending token in headers
          },
        });

        setUsers(response.data); // Assuming API returns an array of users
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      {/* User List */}
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.user_id} className="bg-white rounded-lg shadow-md p-4">
            <li className="flex items-center justify-between text-gray-700">
              {/* Profile Picture */}
              <div className="flex items-center">
                <img
                  src={`http://127.0.0.1:7999${user.profile_pic}` || "https://www.alucoildesign.com/assets/pages/media/profile/profile_user.jpg"} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="ml-2 text-sm font-medium">{user.first_name || 'admin'} {user.last_name}</span>
              </div>

              {/* View Profile Button */}
              <Button
                label="View Profile"
                className="px-2 py-1 rounded-lg bg-secondary text-white hover:bg-blue-700"
                onClick={() => navigate(`/profile/${user.username}/Dashboard`)} // Corrected navigation
              />
            </li>
          </div>
        ))}
      </div>
    </>
  );
};

export default Suggestions;
