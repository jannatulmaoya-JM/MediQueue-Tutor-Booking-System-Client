import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";

import { Star, MapPin, GraduationCap, Clock } from '@gravity-ui/icons';

const TutorCard = ({ tutor }) => {
  const photo = tutor.photo || tutor.image;
  const name = tutor.name || tutor.title;
  const fee = tutor.hourlyFee || tutor.price;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition border border-gray-100 dark:border-gray-700 flex flex-col h-full">
      <img
        src={photo}
        alt={name}
        className="w-full h-48 object-cover rounded-t-2xl"
        onError={(e) => { e.target.src = "https://placehold.co/600x400?text=No+Image"; }}
      />
      <div className="p-5 flex flex-col flex-1">

        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white line-clamp-1 flex-1">{name}</h3>
          
          {tutor.rating && (
            <p className="text-yellow-500 font-bold text-sm flex items-center gap-1 shrink-0 mt-1">
              <Star width="14" height="14" fill="currentColor" />
              <span>{tutor.rating}</span>
            </p>
          )}
        </div>

        <p className="text-emerald-600 text-sm font-medium mb-4">{tutor.subject}</p>

        <div className="space-y-2 mb-4">
          {tutor.location && (
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              <MapPin width="14" height="14" className="text-gray-400 dark:text-gray-500 shrink-0" />
                <span>
                   {typeof tutor.location === 'object' 
                     ? `${tutor.location.city || ''}, ${tutor.location.area || ''}` 
                     : tutor.location}
                </span>
            </p>
          )}

          {fee && (
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              {/* <Money width="14" height="14" className="text-gray-400 dark:text-gray-500 shrink-0" /> */}
              <span>৳  {fee}/hr</span>
            </p>
          )}

          {tutor.experience && (
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              <GraduationCap width="14" height="14" className="text-gray-400 dark:text-gray-500 shrink-0" />
              <span>{tutor.experience} experience</span>
            </p>
          )}

          {tutor.availability && (
            <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2">
              <Clock width="14" height="14" className="text-gray-400 dark:text-gray-500 shrink-0" />
              <span>{tutor.availability}</span>
            </p>
          )}
        </div>

        <div className="mt-auto">
          <Link
            to={`/tutor/${tutor._id}`}
            className="block text-center w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition text-sm"
          >
            Book Session
          </Link>
        </div>
      </div>
    </div>
  );
};


const Tutors = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/tutors?${params.toString()}`)
      .then((res) => setTutors(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [search, startDate, endDate]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">Find a Tutor</h2>
      <p className="text-center text-gray-500 dark:text-gray-400 mb-8">Browse all available tutors</p>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by tutor name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm bg-white dark:bg-gray-800 dark:text-white"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 dark:text-white"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={() => { setSearch(""); setStartDate(""); setEndDate(""); }}
          className="px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition"
        >
          Clear
        </button>
      </div>

      {loading ? (
        <Spinner />
      ) : tutors.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📭</p>
          <p className="text-xl font-semibold">No tutors found</p>
          <p className="text-sm mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutors.map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Tutors;