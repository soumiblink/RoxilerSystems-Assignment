import { useState } from "react";
import { storeAPI } from "../../utils/api";

const StoreCard = ({ store, onRate }) => {
  const [selectedRating, setSelectedRating] = useState(store.userRating || 0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRate = async (rating) => {
    setIsSubmitting(true);
    setSelectedRating(rating);
    await onRate(store.id, rating);
    setIsSubmitting(false);
  };

  const renderStars = (rating, interactive = false) => {
    return [1, 2, 3, 4, 5].map((star) => (
      <button
        key={star}
        type="button"
        disabled={!interactive || isSubmitting}
        onClick={() => interactive && handleRate(star)}
        className={`${
          interactive
            ? "cursor-pointer hover:scale-110 transition-transform"
            : "cursor-default"
        } ${star <= rating ? "text-yellow-400" : "text-gray-300"} ${
          isSubmitting ? "opcity-50" : ""
        }`}
      >
        ★
      </button>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{store.name}</h3>
      <p className="text-sm text-gray-600 mb-4">Address: {store.address}</p>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Overall Rating:
          </span>
          <span className="text-sm text-gray-600">
            {store.overallRating
              ? store.overallRating.toFixed(1)
              : "No ratings"}
          </span>
        </div>
        <div className="flex text-lg">
          {renderStars(Math.round(store.overallRating || 0))}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Your Rating:
          </span>
          <span>
            {selectedRating > 0 ? `${selectedRating}/5` : "Not rated"}
          </span>
        </div>
        <div className="flex text-lg">{renderStars(selectedRating, true)}</div>
      </div>

      <div className="text-xs text-gray-500">
        {store.totalRatings} total rating(s)
      </div>
    </div>
  );
};

export default StoreCard;
