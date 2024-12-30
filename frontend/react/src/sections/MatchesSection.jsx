const MatchesSection = () => {
  const matches = [
    { name: "Prabhakar Kandel", description: "A creative enthusiast passionate about tech and new opportunities.", image: "../img/user1.jpg" },
    { name: "Aakash Raj Jha", description: "An artist with a love for photography and creative storytelling.", image: "../img/user2.jpg" },
    { name: "Anita Jha", description: "A graduate seeking a mindful and peaceful living space.", image: "../img/user3.jpg" },
  ];

  return (
    <>
    <section className="py-12 bg-blue-50">
      <h2 className="text-2xl font-bold text-center mb-8">Best Matches For You</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {matches.map((match, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden max-w-xs w-full sm:w-auto"
          >
            <img
              src={match.image}
              alt={match.name}
              className="w-full h-48 sm:h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{match.name}</h3>
              <p className="text-gray-600 text-sm mt-2">{match.description}</p>
              <button className="mt-4 bg-[#243B55] text-white px-4 py-2 rounded w-full">
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
 
    </>
  );
};

export default MatchesSection;
