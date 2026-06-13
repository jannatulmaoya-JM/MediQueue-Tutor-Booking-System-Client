import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Economics", "Other"];

const MyTutors = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTutor, setEditTutor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axiosSecure
      .get(`/tutors/my-tutors?email=${user.email}`)
      .then((res) => setTutors(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user.email]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const updated = {
      name: form.name.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availability: form.availability.value,
      hourlyFee: parseFloat(form.hourlyFee.value),
      totalSlot: parseInt(form.totalSlot.value),
      institution: form.institution.value,
      teachingMode: form.teachingMode.value,
    };
    setSaving(true);
    try {
      await axiosSecure.put(`/tutors/${editTutor._id}`, updated);
      setTutors((prev) => prev.map((t) => (t._id === editTutor._id ? { ...t, ...updated } : t)));
      toast.success("Tutor updated successfully!");
      setEditTutor(null);
    } catch {
      toast.error("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axiosSecure.delete(`/tutors/${deleteId}`);
      setTutors((prev) => prev.filter((t) => t._id !== deleteId));
      toast.success("Tutor deleted.");
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">My Tutors</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Manage tutors you've created</p>

      {tutors.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4"></p>
          <p className="text-xl font-semibold">No tutors added yet</p>
          <p className="text-sm mt-2">Add a tutor from the "Add Tutor" page</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl shadow">
          <table className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              <tr className="bg-gradient-to-r from-emerald-50 to-cyan-50 dark:from-gray-700 dark:to-gray-700 text-gray-600 dark:text-gray-300 text-sm">
                <th className="px-6 py-3 text-left">Photo</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Subject</th>
                <th className="px-6 py-3 text-left">Fee</th>
                <th className="px-6 py-3 text-left">Slots</th>
                <th className="px-6 py-3 text-left">Mode</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {tutors.map((tutor) => (
                <tr key={tutor._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm text-gray-700 dark:text-gray-300">
                  <td className="px-6 py-4">
                    <img src={tutor.photo} alt={tutor.name} className="w-10 h-10 rounded-full object-cover" />
                  </td>
                  <td className="px-6 py-4 font-medium">{tutor.name}</td>
                  <td className="px-6 py-4">{tutor.subject}</td>
                  <td className="px-6 py-4">${tutor.hourlyFee}/hr</td>
                  <td className="px-6 py-4">{tutor.totalSlot}</td>
                  <td className="px-6 py-4">{tutor.teachingMode}</td>
                  <td className="px-6 py-4 flex gap-2">
                    <button onClick={() => setEditTutor(tutor)}
                      className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 hover:bg-emerald-100 transition" title="Edit">
                      
                    </button>
                    <button onClick={() => setDeleteId(tutor._id)}
                      className="p-2 rounded-lg bg-red-50 dark:bg-red-900/30 text-red-500 hover:bg-red-100 transition" title="Delete">
                     
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editTutor && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 overflow-y-auto py-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-lg">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Edit Tutor</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              {[
                { label: "Name", name: "name", defaultValue: editTutor.name },
                { label: "Photo URL", name: "photo", defaultValue: editTutor.photo },
                { label: "Availability", name: "availability", defaultValue: editTutor.availability },
                { label: "Hourly Fee", name: "hourlyFee", defaultValue: editTutor.hourlyFee, type: "number" },
                { label: "Total Slots", name: "totalSlot", defaultValue: editTutor.totalSlot, type: "number" },
                { label: "Institution", name: "institution", defaultValue: editTutor.institution },
              ].map((f) => (
                <div key={f.name}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
                  <input type={f.type || "text"} name={f.name} defaultValue={f.defaultValue} required
                    className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
                <select name="subject" defaultValue={editTutor.subject}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white">
                  {subjects.map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teaching Mode</label>
                <select name="teachingMode" defaultValue={editTutor.teachingMode}
                  className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white">
                  <option>Online</option><option>Offline</option><option>Both</option>
                </select>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setEditTutor(null)}
                  className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:text-gray-300">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl text-sm disabled:opacity-60">
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-sm text-center">
            <p className="text-5xl mb-4"></p>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Delete Tutor?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">This action cannot be undone.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:text-gray-300">Cancel</button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutors;