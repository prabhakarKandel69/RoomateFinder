export const handleSearch = async ({ searchTerm, roomType }, setMatches) => {
  // Check if search term is empty
  if (!searchTerm.trim()) {
    alert("Please enter some data before searching!");
    return; // Exit early if no search term
  }

  try {
    const response = await fetch("http://127.0.0.1:7999/search/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: searchTerm,  // Using `searchTerm` for the address
        preferences: [roomType],  // Wrapping roomType in an array
      }),    });

    if (response.ok) {
      const result = await response.json();
      // alert("Filters applied successfully!");
      console.log("Matches received:", result); // Log the result for debugging

      // Ensure setMatches is called only if it's provided
      if (setMatches) {
        setMatches(result); // Update matches using the provided setter function
      }
    } else {
      console.error("Error:", response.statusText);
      // alert("Failed to apply filters.");
    }
  } catch (error) {
    console.error("Error:", error);
    // alert("An error occurred while applying filters.");
  }
};
