// import { useState } from "react";
// import { storeAPI } from "../../utils/api";

// const StoreCard = ({ store, onRate }) => {
//   const [selectedRating, setSelectedRating] = useState(store.userRating || 0);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleRate = async (rating) => {
//     setIsSubmitting(true);
//     setSelectedRating(rating);
//     await onRate(store.id, rating);
//     setIsSubmitting(false);
//   };

//   const renderStars = (rating, interactive = false) => {
//     return [1, 2, 3, 4, 5].map((star) => (
//       <button
//         key={star}
//         type="button"
//         disabled={!interactive || isSubmitting}
//         onClick={() => interactive && handleRate(star)}
//         className={`${
//           interactive
//             ? "cursor-pointer hover:scale-110 transition-transform"
//             : "cursor-default"
//         } ${star <= rating ? "text-yellow-400" : "text-gray-300"} ${
//           isSubmitting ? "opcity-50" : ""
//         }`}
//       >
//         ★
//       </button>
//     ));
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
//       <h3 className="text-lg font-semibold text-gray-900 mb-2">{store.name}</h3>
//       <p className="text-sm text-gray-600 mb-4">Address: {store.address}</p>

//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-medium text-gray-700">
//             Overall Rating:
//           </span>
//           <span className="text-sm text-gray-600">
//             {store.overallRating
//               ? store.overallRating.toFixed(1)
//               : "No ratings"}
//           </span>
//         </div>
//         <div className="flex text-lg">
//           {renderStars(Math.round(store.overallRating || 0))}
//         </div>
//       </div>

//       <div className="mb-4">
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-medium text-gray-700">
//             Your Rating:
//           </span>
//           <span>
//             {selectedRating > 0 ? `${selectedRating}/5` : "Not rated"}
//           </span>
//         </div>
//         <div className="flex text-lg">{renderStars(selectedRating, true)}</div>
//       </div>

//       <div className="text-xs text-gray-500">
//         {store.totalRatings} total rating(s)
//       </div>
//     </div>
//   );
// };

// export default StoreCard;
import { useState } from "react";

const StoreCard = ({ store, onRate }) => {
  const [selectedRating, setSelectedRating] = useState(store.userRating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleRate = async (rating) => {
    setIsSubmitting(true);
    setSelectedRating(rating);
    
    try {
      await onRate(store.id, rating);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      setSelectedRating(store.userRating || 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false) => {
    const displayRating = interactive ? (hoverRating || selectedRating) : rating;
    
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={!interactive || isSubmitting}
        onClick={() => interactive && handleRate(star)}
        onMouseEnter={() => interactive && setHoverRating(star)}
        onMouseLeave={() => interactive && setHoverRating(0)}
        className={`text-2xl transition-all duration-150 ${
          interactive
            ? "cursor-pointer hover:scale-125 active:scale-110"
            : "cursor-default"
        } ${star <= displayRating ? "text-yellow-400" : "text-gray-300"} ${
          isSubmitting ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label={`Rate ${star} stars`}
      >
        {star <= displayRating ? "★" : "☆"}
      </button>
    ));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Gradient Top Border */}
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="p-6">
        {/* Store Header */}
        <div className="mb-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
              {store.name}
            </h3>
            <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded-full">
              <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-blue-600">
                {store.totalRatings || 0}
              </span>
            </div>
          </div>
          
          <div className="flex items-start text-gray-600">
            <svg className="w-4 h-4 mt-0.5 mr-2 flex-shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <p className="text-sm">{store.address}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Overall Rating Section */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">
              Overall Rating
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-900">
                {store.overallRating ? store.overallRating.toFixed(1) : "—"}
              </span>
              <span className="text-sm text-gray-500">/5</span>
            </div>
          </div>
          <div className="flex justify-center space-x-1 bg-gray-50 rounded-lg py-3">
            {renderStars(Math.round(store.overallRating || 0))}
          </div>
          <div className="text-center mt-2">
            <span className="text-xs text-gray-500">
              Based on {store.totalRatings || 0} rating{store.totalRatings !== 1 ? 's' : ''}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* User Rating Section */}
        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">
              Your Rating
            </span>
            <div className="flex items-center">
              {selectedRating > 0 ? (
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {selectedRating}/5
                </span>
              ) : (
                <span className="text-sm text-gray-400 italic">Not rated yet</span>
              )}
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg py-4 relative">
            {renderStars(selectedRating, true)}
            
            {/* Loading Overlay */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            {hoverRating > 0 ? (
              <span className="font-medium text-gray-700">
                Click to rate {hoverRating} star{hoverRating !== 1 ? 's' : ''}
              </span>
            ) : (
              "Click to rate this store"
            )}
          </p>

          {/* Success Message */}
          {showSuccess && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg animate-bounce">
              ✓ Rating submitted!
            </div>
          )}
        </div>
      </div>

      {/* Footer with additional info */}
      <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <svg className="w-3.5 h-3.5 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Active</span>
            </div>
            {store.overallRating && (
              <div className="flex items-center">
                <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${(store.overallRating / 5) * 100}%` }}
                  ></div>
                </div>
                <span>{((store.overallRating / 5) * 100).toFixed(0)}%</span>
              </div>
            )}
          </div>
          
          <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline flex items-center">
            View Details
            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoreCard;