import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../utils/api';
import Dnavbar from '../components/Dnavbar';
import Dsnavbar from '../components/Dsnavbar';
import AuthRedirect from '../components/AuthRedirect';
import MatchesSection from '../sections/MatchesSection';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await api.get('/matches/requests/'); // ✅ No manual token needed
        setMatches(response.data);
      } catch (err) {
        setError("Failed to fetch matches");
        if (err.response && err.response.status === 401) {
          navigate('/'); // 🔄 Auto-redirect to login if unauthorized
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [navigate]);

  const handleAccept = async (user_id) => {
    try {
      await api.post(`/matches/accept/${user_id}/`);
      console.log(`Accepted user with ID: ${user_id}`);
      setMatches(matches.filter(user => user.id !== user_id)); // 🔄 Remove accepted user
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (user_id) => {
    try {
      await api.post(`/matches/reject/${user_id}/`);
      console.log(`Rejected user with ID: ${user_id}`);
      setMatches(matches.filter(user => user.id !== user_id)); // 🔄 Remove rejected user
    } catch (err) {
      console.error(err);
    }
  };

  // Filter matches for a specific username
  const filteredMatches = username
    ? matches.filter((user) => user.username === username)
    : matches;

  // Remove duplicate usernames
  const uniqueMatches = [
    ...new Map(filteredMatches.map((user) => [user.username, user])).values(),
  ];

  return (
    <div className="bg-primary min-h-screen">
      <Dnavbar active="Matches" />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar (Only Visible on Desktop) */}
        <div className="hidden md:flex md:w-1/5 bg-white flex-col justify-between p-4 m-0 md:m-8 rounded-lg shadow-lg">
          <Dsnavbar active="Matches" />
        </div>

          {/* Main Content */}
          <div className="flex-1 m-3 min-h-screen">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {uniqueMatches.length > 0 ? (
              <MatchesSection matches={uniqueMatches} onAccept={handleAccept} onReject={handleReject} />
            ) : (
              <p>No matches found.</p>
            )}
          </div>

        </div>
      </div>
   
  );
};

export default Matches;
