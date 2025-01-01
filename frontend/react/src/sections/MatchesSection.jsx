import Card from "../components/Card";

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
            <Card {...match} />
            
          </div>
        ))}
      </div>
    </section>
 
    </>
  );
};

export default MatchesSection;
