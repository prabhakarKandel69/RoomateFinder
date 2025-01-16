import Button from "../components/Button";
const Suggestions = () => {
    const users = [
      { id: 1, name: "User 1" },
      { id: 2, name: "User 2" },
      { id: 3, name: "User 3" },
      { id: 4, name: "User 4" },
      { id: 5, name: "User 5" },
      { id: 6, name: "User 6" },
    ];
  
    return (
      <div className="bg-white rounded-lg shadow-md p-4 w-64">
        {/* Header */}
        <h2 className="text-lg text-center font-inter font-bold text-secondary mb-4">Suggestions</h2>
        
        {/* User List */}
        <ul className="space-y-4">
          {users.map((user) => (
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
                label="view profile"
                className="px-2 py-1 rounded-lg bg-secondary text-white hover:bg-blue-700"
                onClick={() => console.log("View Profile")}
                />


            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Suggestions;
  