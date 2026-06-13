import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import useAxiosSecure from "../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/bookings?email=${user.email}`)
      .then((res) => setBookings(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user.email]);

  const handleCancel = async () => {
    try {
      await axiosSecure.patch(`/bookings/${cancelId}`, { status: "cancelled" });
      setBookings((prev) =>
        prev.map((b) => (b._id === cancelId ? { ...b, status: "cancelled" } : b))
      );
      toast.success("Booking cancelled.");
      setCancelId(null);
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  const statusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
      confirmed: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
      cancelled: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || styles.pending}`}>
        {status}
      </span>
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Booked Sessions</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Track and manage your learning sessions</p>

      {bookings.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4"></p>
          <p className="text-xl font-semibold">No sessions booked yet</p>
          <p className="text-sm mt-2">Browse tutors and book your first session</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-gray-700 dark:to-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                <th className="px-6 py-3 text-left">Tutor Name</th>
                <th className="px-6 py-3 text-left">Student Name</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm text-gray-700 dark:text-gray-300">
                  <td className="px-6 py-4 font-medium">{booking.tutorName}</td>
                  <td className="px-6 py-4">{booking.studentName}</td>
                  <td className="px-6 py-4">{booking.studentEmail}</td>
                  <td className="px-6 py-4">{statusBadge(booking.status)}</td>
                  <td className="px-6 py-4">
                    {booking.status !== "cancelled" && (
                      <button onClick={() => setCancelId(booking._id)}
                        className="px-3 py-1.5 bg-red-50 dark:bg-red-900/30 text-red-500 text-xs rounded-lg hover:bg-red-100 transition font-medium">
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Cancel Confirm Modal */}
      {cancelId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
            <p className="text-5xl mb-4"></p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Cancel This Session?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">The booking status will be updated to cancelled.</p>
            <div className="flex gap-3">
              <button onClick={() => setCancelId(null)}
                className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:text-gray-300">Keep It</button>
              <button onClick={handleCancel}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;