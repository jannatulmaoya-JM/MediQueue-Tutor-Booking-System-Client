import { Link } from "react-router-dom";
import { MapPin, Clock, Briefcase, Star } from '@gravity-ui/icons';

const TutorCard = ({ tutor }) => {
  const id = tutor._id;
  const photo = tutor.photo || tutor.image;
  const name = tutor.name || tutor.title;
  const fee = tutor.hourlyFee || tutor.price;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col justify-between transition-all duration-300 group h-full">
      
      <div className="relative aspect-[4/3] w-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src={photo}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = "https://placehold.co/600x450?text=No+Image";
          }}
        />
      </div>

   
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
   
          <div className="flex justify-between items-start gap-2 mb-1">
            <h3 className="font-bold text-xl text-gray-800 dark:text-white line-clamp-1">
              {name}
            </h3>
            {tutor.rating && (
              <div className="flex items-center gap-1 text-yellow-500 font-bold text-sm shrink-0 mt-1">
                <Star width="16" height="16" fill="currentColor" />
                <span>{tutor.rating}</span>
              </div>
            )}
          </div>
          
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold text-sm mb-4">
            {tutor.subject}
          </p>

          <div className="space-y-2.5 text-sm text-gray-600 dark:text-gray-300">
            {tutor.location && (
              <div className="flex items-center gap-2.5">
                <MapPin width="16" height="16" className="text-gray-400 shrink-0" />
                <span className="truncate">{tutor.location}</span>
              </div>
            )}

            {fee && (
              <div className="flex items-center gap-2.5">
                <span>৳ {fee}/hr</span>
              </div>
            )}

            {tutor.experience && (
              <div className="flex items-center gap-2.5">
                <Briefcase width="16" height="16" className="text-gray-400 shrink-0" />
                <span>{tutor.experience} experience</span>
              </div>
            )}

            {tutor.availability && (
              <div className="flex items-center gap-2.5">
                <Clock width="16" height="16" className="text-gray-400 shrink-0" />
                <span className="truncate">{tutor.availability}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-gray-100 dark:border-gray-700 flex flex-col gap-3">
 
           <Link
            to={`/tutor/${id}`}
            className="w-full py-2.5 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:opacity-95 text-white text-center font-bold rounded-xl shadow-sm transition duration-300 block text-sm"
          >
            Book Session
          </Link>
        </div>
      </div>

    </div>
  );
};

export default TutorCard;