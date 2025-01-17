import Button from "../components/Button";

const Suggestions = () => {
  const users = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
    { id: 6, name: "User 6" },
    { id: 7, name: "User 4" },
    { id: 8, name: "User 5" },
    { id: 9, name: "User 6" },
  ];

  return (
    <>
   
   

      {/* User List */}
      <div className="space-y-4">
        {users.map((user) => (
             <div className="bg-white rounded-lg shadow-md p-4   ">
          <li
            key={user.id}
            className="flex items-center justify-between text-gray-700"
          >
            {/* Profile Picture */}
            <div className="flex items-center">
              <img
                src="https://www.alucoildesign.com/assets/pages/media/profile/profile_user.jpg" // Replace with actual image URL
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <span className="ml-2 text-sm font-medium">{user.name}</span>
            </div>

            {/* View Profile Button */}
            <Button
              label="View Profile"
              className="px-2 py-1 rounded-lg bg-secondary text-white hover:bg-blue-700"
              onClick={() => console.log("View Profile")}
            />
          </li>
          </div>
        ))}
      </div>
    </>
  );
};

export default Suggestions;
