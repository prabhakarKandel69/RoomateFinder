// Utility function to handle search
export const handleSearch = ({ searchTerm, roomType }) => {
  // Check if search term is empty
  if (!searchTerm.trim()) {
    alert("Please enter some data before searching!");
    return; // Exit early if no search term
  }



  // Example of handling the search logic (API call or filtering)
  alert(`Searching for "${searchTerm}" in "${roomType}" room type.`);

  // Extend this logic to include your search functionality
  // Example: API call or filter items based on searchTerm and roomType
};
