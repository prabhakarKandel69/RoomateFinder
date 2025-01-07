// This utility function handles search validation
export const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      alert("Please enter some data before searching!");
    } else {
      alert(`Search Term: ${searchTerm}`);
      // Extend this logic to include API calls or navigation
    }
  };

 
  
  