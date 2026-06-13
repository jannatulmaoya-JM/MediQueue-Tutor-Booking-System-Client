import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Spinner from "../components/Spinner";

import { Pencil, TrashBin, Flask, TriangleExclamation } from '@gravity-ui/icons';

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
                  <td className="px-6 py-4 flex items-center gap-3">
                    <button 
                      onClick={() => setEditTutor(tutor)}
                      className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 hover:bg-emerald-200 transition flex items-center justify-center shrink-0 cursor-pointer" 
                      title="Edit"
                    >
                      {/* FIXED: আপনার দেওয়া <Pencil /> কম্পোনেন্ট ব্যবহার করা হয়েছে এবং রঙ গাঢ় করার জন্য text-emerald-700 দেওয়া হয়েছে */}
                      <Pencil width="16" height="16" stroke="currentColor" fill="currentColor" className="text-emerald-700 dark:text-emerald-400" />
                    </button>
                    <button 
                      onClick={() => setDeleteId(tutor._id)}
                      className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/40 hover:bg-red-200 transition flex items-center justify-center shrink-0 cursor-pointer" 
                      title="Delete"
                    >
                      {/* FIXED: রঙ গাঢ় করার জন্য text-red-700 দেওয়া হয়েছে */}
                      <TrashBin width="16" height="16" stroke="currentColor" fill="currentColor" className="text-red-700 dark:text-red-400" />
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
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
                <Flask width="24" height="24" fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Edit Tutor</h3>
            </div>
            
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
                  className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                <button type="submit" disabled={saving}
                  className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-xl text-sm disabled:opacity-60 transition shadow-sm hover:scale-105 active:scale-95 flex gap-2 items-center justify-center font-semibold">
                  {saving ? "Saving Changes..." : "Save Changes"}
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
            <div className="w-16 h-16 flex items-center justify-center bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-full mb-5 mx-auto">
              <TriangleExclamation width="32" height="32" fill="currentColor" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Delete Tutor?</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 max-w-xs mx-auto leading-relaxed">This action cannot be undone. All data related to this tutor will be permanently removed.</p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteId(null)}
                className="flex-1 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm dark:text-gray-300 transition hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
              <button onClick={handleDelete}
                className="flex-1 py-2.5 bg-red-500 text-white rounded-xl text-sm hover:bg-red-600 transition shadow-sm hover:scale-105 active:scale-95 font-semibold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTutors;