
const HeroSection = () => {
  return (
    <section
      className="bg-cover bg-center h-[500px] flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url(../img/hero.png)` }}
    >
      <h1 className="text-4xl font-bold text-center mb-4">Find Your Perfect Roommate Effortlessly!</h1>
      <p className="text-center max-w-xl mb-6">
        Connecting like-minded individuals to share spaces and create meaningful experiences. Your perfect roommate is just a click away.
      </p>
      <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
        <input
          type="text"
          placeholder="Search for your ideal roommate"
          className="px-4 py-2 w-80 text-black focus:outline-none"
        />
        <button className="bg-blue-600 px-6 py-2 text-white">Search</button>
      </div>
    </section>
  );
};

export default HeroSection;
