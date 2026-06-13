import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const subjects = ["Mathematics", "Physics", "Chemistry", "Biology", "English", "History", "Geography", "Computer Science", "Economics", "Other"];

const AddTutor = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const tutorData = {
      name: form.name.value,
      photo: form.photo.value,
      subject: form.subject.value,
      availability: form.availability.value,
      hourlyFee: parseFloat(form.hourlyFee.value),
      totalSlot: parseInt(form.totalSlot.value),
      sessionStartDate: form.sessionStartDate.value,
      institution: form.institution.value,
      experience: form.experience.value,
      location: { area: form.area.value, city: form.city.value },
      teachingMode: form.teachingMode.value,
      createdBy: user.email,
    };

    setLoading(true);
    try {
      await axiosSecure.post("/tutors", tutorData);
      toast.success("Tutor added successfully! ");
      navigate("/my-tutors");
    } catch {
      toast.error("Failed to add tutor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12 dark:bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Add a Tutor</h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Fill in the details to list a new tutor</p>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { label: "Tutor Name", name: "name", type: "text", placeholder: "Name" },
            { label: "Photo URL", name: "photo", type: "url", placeholder: "https://..." },
            { label: "Availability", name: "availability", type: "text", placeholder: "Sun-Thu 5:00PM-8:00PM" },
            { label: "Hourly Fee ($)", name: "hourlyFee", type: "number", placeholder: "2500" },
            { label: "Total Slots", name: "totalSlot", type: "number", placeholder: "100" },
            { label: "Institution", name: "institution", type: "text", placeholder: "Harvard University" },
            { label: "Experience (years)", name: "experience", type: "text", placeholder: "5" },
            { label: "Area", name: "area", type: "text", placeholder: "Area" },
            { label: "City", name: "city", type: "text", placeholder: "City" },
          ].map((f) => (
            <div key={f.name}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{f.label}</label>
              <input type={f.type} name={f.name} required placeholder={f.placeholder}
                className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-emerald-500" />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
            <select name="subject" required className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-emerald-500">
              {subjects.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Teaching Mode</label>
            <select name="teachingMode" required className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-emerald-500">
              <option>Online</option>
              <option>Offline</option>
              <option>Both</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Session Start Date</label>
            <input type="date" name="sessionStartDate" required
              className="w-full px-4 py-2.5 border border-gray-200 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white focus:outline-none focus:border-emerald-500" />
          </div>
        </div>

        <button type="submit" disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold rounded-xl shadow hover:opacity-90 transition disabled:opacity-60">
          {loading ? "Adding Tutor..." : "Add Tutor"}
        </button>
      </form>
    </div>
  );
};

export default AddTutor;