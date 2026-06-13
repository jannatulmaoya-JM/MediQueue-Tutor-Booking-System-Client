import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Star } from '@gravity-ui/icons';

const TutorDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/tutors/${id}`)
      .then((res) => setTutor(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleBook = async (e) => {
    e.preventDefault();

    const bookingData = {
      tutorId: tutor._id,
      tutorName: tutor.name || tutor.title,
      studentName: user.displayName,
      studentEmail: user.email,
      phone: e.target.phone.value,
      status: "pending",
    };

    setBooking(true);
    try {
      await axiosSecure.post("/bookings", bookingData);
      toast.success("Session booked successfully!");
      
      setTutor(prev => ({
        ...prev,
        bookedSlot: (prev.bookedSlot || 0) + 1
      }));

      setModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  if (loading) return <Spinner />;
  if (!tutor) return <div className="text-center py-20 text-gray-400">Tutor not found.</div>;

  const photo = tutor.photo || tutor.image;
  const name = tutor.name || tutor.title;
  const fee = tutor.hourlyFee || tutor.price;
  const totalSlots = tutor.totalSlot || 0;
  const bookedSlots = tutor.bookedSlot || 0;
  const remainingSlots = totalSlots - bookedSlots;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row items-stretch gap-6 md:gap-8 border border-gray-100 dark:border-gray-700">

        <div className="w-full md:w-[380px] shrink-0 relative bg-gray-100 dark:bg-gray-700 rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl overflow-hidden">
          <img 
            src={photo} 
            alt={name} 
            className="w-full h-64 md:h-full object-cover min-h-[320px]"
            onError={(e) => { e.target.src = "https://placehold.co/800x400?text=No+Image"; }} 
          />
        </div>


        <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-4 mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{name}</h1>
                <p className="text-emerald-600 font-semibold text-lg mt-0.5">{tutor.subject}</p>
              </div>
              {tutor.rating && (
                <div className="flex items-center gap-1 text-yellow-500 font-bold bg-amber-50 dark:bg-amber-950/30 px-3 py-1 rounded-lg text-sm shrink-0 mt-1">
                  <Star width="16" height="16" fill="currentColor" />
                  <span>{tutor.rating}</span>
                </div>
              )}
            </div>

            <div className="space-y-2 text-base text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-gray-700 pt-4">
              
              {tutor.institution && (
                <p>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Varsity:</span> {tutor.institution}
                </p>
              )}

              {tutor.experience && (
                <p>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Experience:</span> {tutor.experience}
                </p>
              )}

              {tutor.location && (
                <p>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Location:</span>{" "}
                  {typeof tutor.location === 'object' 
                    ? `${tutor.location.city || ''}, ${tutor.location.area || ''}` 
                    : tutor.location}
                </p>
              )}

              {tutor.availability && (
                <p>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Availability:</span> {tutor.availability}
                </p>
              )}

              {tutor.teachingMode && (
                <p>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Mode:</span> {tutor.teachingMode}
                </p>
              )}

              {fee && (
                <p>
                  <span className="font-bold text-gray-800 dark:text-gray-200">Hourly fees:</span> ৳ {fee}/hr
                </p>
              )}

              <p>
                <span className="font-bold text-gray-800 dark:text-gray-200">Available Slots:</span>{" "}
                <span className={`font-bold ${remainingSlots > 0 ? "text-emerald-600" : "text-red-500"}`}>
                  {remainingSlots > 0 ? `${remainingSlots} left` : "No slots available"}
                </span>
              </p>

              {tutor.description && (
                <p className="pt-2">
                  <span className="font-bold text-gray-800 dark:text-gray-200">Bio:</span> {tutor.description}
                </p>
              )}

            </div>
          </div>

    
          <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
            <button 
              onClick={() => setModalOpen(true)}
              disabled={remainingSlots <= 0}
              className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:opacity-95 hover:scale-[1.02] transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:scale-100 disabled:cursor-not-allowed text-center"
            >
              {remainingSlots > 0 ? "Book Session" : "Seat Full"}
            </button>
          </div>
        </div>
      </div>

    
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md border border-gray-100 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Book a Session</h3>
            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Student Name</label>
                <input value={user?.displayName || ""} readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input value={user?.email || ""} readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                <input type="tel" name="phone" required placeholder="+880 1XXXXXXXXX"
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tutor</label>
                <input value={name} readOnly
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none" />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setModalOpen(false)}
                  className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  Cancel
                </button>
                <button type="submit" disabled={booking}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold rounded-xl text-sm shadow hover:opacity-95 disabled:opacity-60 transition">
                  {booking ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TutorDetails;