const FeaturesSection = ({onSignInClick}) => {
    const features = [
      { title: "Easy Search & Filters", description: "Find your perfect roommate with advanced smart features.", icon: "🔍" },
      { title: "Verified Profiles", description: "Every profile is verified, so you can connect with confidence.", icon: "✅" },
      { title: "Smart Matching", description: "We help you connect with roommates who truly match your vibe.", icon: "💡" },
      { title: "Secure Messaging", description: "Chat safely with potential roommates through our secure platform.", icon: "🔒" },
    ];
  
    return (
      <>
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="bg-primary shadow-md rounded-lg p-6 text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-secondary  py-16 flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-blue-50 text-2xl sm:text-3xl font-bold mb-6">
          Ready to Find Your Perfect Partner?
        </h2>
        <button onClick={onSignInClick}
           className="bg-blue-50 text-[#243B55] px-6 py-2 rounded-full font-medium shadow hover:bg-gray-100 transition">
          Get Started Now
        </button>
      </div>
    </section>
    </>
    );
  };
  
  export default FeaturesSection;
  