const FeaturesSection = () => {
    const features = [
      { title: "Easy Search & Filters", description: "Find your perfect roommate with advanced smart features.", icon: "🔍" },
      { title: "Verified Profiles", description: "Every profile is verified, so you can connect with confidence.", icon: "✅" },
      { title: "Smart Matching", description: "We help you connect with roommates who truly match your vibe.", icon: "💡" },
      { title: "Secure Messaging", description: "Chat safely with potential roommates through our secure platform.", icon: "🔒" },
    ];
  
    return (
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
  export default FeaturesSection;
  