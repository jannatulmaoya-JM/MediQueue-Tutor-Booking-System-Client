import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/banner1.jpg"; 
import img2 from "../assets/banner2.jpg"; 
import img3 from "../assets/banner3.jpg"; 

const slides = [
  {
    title: "Find & Book the Right Tutor, Instantly",
    subtitle: "Book 1-on-1 sessions with certified educators across all subjects",
    imgType: "background",
    imgSrc: img1, 
  },
  {
    title: "Flexible Scheduling",
    subtitle: "Choose your own time slots that fit your busy schedule",
    imgType: "grid",
    imgSrc: img2,
  },
  {
    title: "Track Your Progress",
    subtitle: "Manage all your booked sessions and learning journey in one place",
    imgType: "grid",
    imgSrc: img3,
  },
];

const Banner = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const BrowseButton = () => (
    <Link
      to="/tutors"
      className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all duration-300"
    >
      Browse Tutors →
    </Link>
  );

  return (
    <section className="bg-white dark:bg-gray-900 px-4 py-8 md:py-12">
      <div className="max-w-7xl mx-auto bg-white dark:bg-gray-800 border border-emerald-100 dark:border-emerald-900 rounded-2xl overflow-hidden shadow-lg relative min-h-[520px] md:min-h-[500px] flex items-stretch">
        
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlideIndex ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
            }`}
          >
            {slide.imgType === "background" && (
              <div
                className="w-full h-full bg-cover bg-center flex items-center relative"
                style={{ backgroundImage: `url(${slide.imgSrc})` }}
              >
                <div className="absolute inset-0 bg-black/40 z-0"></div>
                <div className="relative z-10 w-full px-8 md:px-16 text-white text-left">
                  <h1 className="text-3xl md:text-5xl font-extrabold mb-4 max-w-2xl leading-tight drop-shadow">
                    {slide.title}
                  </h1>
                  <p className="text-base md:text-lg text-white/90 mb-8 max-w-xl drop-shadow">
                    {slide.subtitle}
                  </p>
                  <BrowseButton />
                </div>
              </div>
            )}

            {slide.imgType === "grid" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-full p-6 md:p-12 items-center w-full">
                <div className="text-center md:text-left order-2 md:order-1 flex flex-col items-center md:items-start justify-center">
                  <h1 className="text-2xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-3 md:mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 mb-6 md:mb-8 max-w-md">
                    {slide.subtitle}
                  </p>
                  <BrowseButton />
                </div>

                <div className="order-1 md:order-2 flex items-center justify-center h-[160px] md:h-full max-h-[350px]">
                  <img
                    src={slide.imgSrc}
                    alt={slide.title}
                    className="object-contain max-h-full rounded-xl shadow-sm"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSlideIndex(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === currentSlideIndex ? "bg-emerald-600 w-6" : "bg-emerald-200"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Banner;