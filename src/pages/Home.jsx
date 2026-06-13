import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TutorCard from "../components/TutorCard";
import Spinner from "../components/Spinner";
import Banner from "../components/Banner";

import { Magnifier, GraduationCap, Play, ShieldCheck, Display, CircleDollar } from '@gravity-ui/icons';

const slides = [
  { title: "Learn from Expert Tutors", subtitle: "Book 1-on-1 sessions with certified educators across all subjects", bg: "from-emerald-600 to-cyan-700" },
  { title: "Flexible Scheduling", subtitle: "Choose your own time slots that fit your busy schedule", bg: "from-teal-600 to-emerald-800" },
  { title: "Track Your Progress", subtitle: "Manage all your booked sessions and learning journey in one place", bg: "from-cyan-700 to-teal-600" },
];

const howItWorks = [
  { icon: <Magnifier width="24" height="24" fill="currentColor" />, step: "Browse Tutors", desc: "Explore tutors by subject, schedule, and teaching mode." },
  { icon: <GraduationCap width="24" height="24" fill="currentColor" />, step: "Book a Session", desc: "Pick a slot that works for you and confirm your booking instantly." },
  { icon: <Play width="24" height="24" fill="currentColor" />, step: "Start Learning", desc: "Join your session and accelerate your learning journey." },
];

const whyChoose = [
  { icon: <ShieldCheck width="24" height="24" fill="currentColor" />, title: "Verified Tutors", desc: "All tutors are vetted for qualifications and experience." },
  { icon: <CircleDollar width="24" height="24" fill="currentColor" />, title: "Affordable Rates", desc: "Competitive hourly fees with no hidden charges." },
  { icon: <Play width="24" height="24" fill="currentColor" />, title: "Easy to Use", desc: "Simple booking flow with real-time slot availability." },
  { icon: <Display width="24" height="24" fill="currentColor" />, title: "Secure Platform", desc: "Your data is safe with JWT-protected private sessions." },
];

const Home = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSlide((s) => (s + 1) % slides.length), 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/tutors?limit=6`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setTutors(data);
      })
      .catch((err) => {
        console.error(err);
        setTutors([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="dark:bg-gray-900">
       <Banner/> 

      {/* Available Tutors */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Available Tutors</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">Find your perfect match from our top educators</p>

        {loading ? (
          <Spinner />
        ) : tutors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor) => (
              <TutorCard key={tutor._id} tutor={tutor} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <p className="text-4xl mb-3"></p>
            <p>No tutors available right now</p>
          </div>
        )}

        <div className="text-center mt-10">
          <Link to="/tutors" className="inline-block px-8 py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow hover:opacity-90 transition">
            View All Tutors
          </Link>
        </div>
      </section>

      {/* How It Works  */}
      <section className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-gray-800/50 dark:to-gray-900 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">How It Works</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-10">Three simple steps to your next learning session</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((item, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow hover:shadow-md transition text-center flex flex-col items-center">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl mb-4 shrink-0">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{item.step}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Why Choose MediQueue?</h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-10">We're built for learners, by educators</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChoose.map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow hover:shadow-lg transition text-center flex flex-col items-center">
              <div className="w-12 h-12 flex items-center justify-center bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 rounded-xl mb-4 shrink-0">
                {item.icon}
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;