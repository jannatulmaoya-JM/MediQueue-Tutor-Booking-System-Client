import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import TutorCard from "../components/TutorCard"; // 🛠️ গ্লোবাল কার্ড ব্যবহার করা হলো

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