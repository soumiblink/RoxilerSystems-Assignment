// import { useEffect, useState } from "react";
// import StoreCard from "./StoreCard";
// import { storeAPI } from "../../utils/api";

// const StoreList = () => {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filters, setFilters] = useState({
//     name: "",
//     address: "",
//   });

//   useEffect(() => {
//     fetchStores();
//   }, [filters]);

//   const fetchStores = async () => {
//     setLoading(true);
//     try {
//       const response = await storeAPI.getStores(filters);
//       setStores(response.data.storesWithRatings);
//     } catch (err) {
//       console.error("Error fetching stores:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleRatingSubmit = async (storeId, rating) => {
//     try {
//       await storeAPI.rateStore(storeId, rating);
//       fetchStores();
//     } catch (err) {
//       console.error("Error submitting rating:", err);
//       alert("Error in submitting rating");
//     }
//   };

//   return (
//     <div>
//       <div className="mb-6 bg-white p-4 rounded-lg shadow">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             value={filters.name}
//             placeholder="Search by store name"
//             onChange={(e) => handleFilterChange("name", e.target.value)}
//             className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
//           />
//           <input
//             type="text"
//             value={filters.address}
//             placeholder="Search by store address"
//             onChange={(e) => handleFilterChange("address", e.target.value)}
//             className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
//           />
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-32">
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {stores.map((store) => (
//             <StoreCard
//               key={store.id}
//               store={store}
//               onRate={handleRatingSubmit}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default StoreList;
import { useEffect, useState } from "react";

// Mock Store Card Component
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
      <div className="h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      <div className="p-6">
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

        <div className="border-t border-gray-200 my-4"></div>

        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">Overall Rating</span>
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
        </div>

        <div className="border-t border-gray-200 my-4"></div>

        <div className="relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-gray-700">Your Rating</span>
            <div className="flex items-center">
              {selectedRating > 0 ? (
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {selectedRating}/5
                </span>
              ) : (
                <span className="text-sm text-gray-400 italic">Not rated</span>
              )}
            </div>
          </div>
          
          <div className="flex justify-center space-x-2 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg py-4 relative">
            {renderStars(selectedRating, true)}
            
            {isSubmitting && (
              <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
            )}
          </div>

          {showSuccess && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs font-medium px-4 py-2 rounded-full shadow-lg animate-bounce">
              ✓ Rating submitted!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Mock API
const storeAPI = {
  getStores: async (filters) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const allStores = [
      { id: 1, name: "Tech Haven", address: "123 Silicon Valley Rd, CA", overallRating: 4.5, totalRatings: 245, userRating: 0 },
      { id: 2, name: "Book Nook", address: "456 Library Lane, NY", overallRating: 4.8, totalRatings: 189, userRating: 5 },
      { id: 3, name: "Fashion Forward", address: "789 Style Street, LA", overallRating: 4.2, totalRatings: 432, userRating: 0 },
      { id: 4, name: "Gourmet Grocers", address: "321 Food Court, Chicago", overallRating: 4.7, totalRatings: 567, userRating: 4 },
      { id: 5, name: "Pet Paradise", address: "654 Animal Ave, Seattle", overallRating: 4.9, totalRatings: 321, userRating: 0 },
      { id: 6, name: "Home Essentials", address: "987 Comfort Blvd, Boston", overallRating: 4.3, totalRatings: 198, userRating: 3 },
    ];
    return { data: { storesWithRatings: allStores } };
  },
  rateStore: async (storeId, rating) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true };
  }
};

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const fetchStores = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await storeAPI.getStores(filters);
      setStores(response.data.storesWithRatings);
    } catch (err) {
      console.error("Error fetching stores:", err);
      setError("Failed to load stores. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      address: "",
    });
  };

  const handleRatingSubmit = async (storeId, rating) => {
    try {
      await storeAPI.rateStore(storeId, rating);
      await fetchStores();
    } catch (err) {
      console.error("Error submitting rating:", err);
      throw new Error("Failed to submit rating");
    }
  };

  if (loading && stores.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading stores...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Error Loading Stores</h3>
          <p className="text-gray-600 text-center mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore Stores</h1>
          <p className="text-gray-600">Discover and rate your favorite stores</p>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900">Search Filters</h3>
            </div>
            {(filters.name || filters.address) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store Name</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={filters.name}
                  placeholder="Search by store name..."
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  value={filters.address}
                  placeholder="Search by address..."
                  onChange={(e) => handleFilterChange("address", e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-900">
              {stores.length} Store{stores.length !== 1 ? 's' : ''} Found
            </h2>
            {loading && (
              <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
            </svg>
            <span>Grid View</span>
          </div>
        </div>

        {/* Store Grid */}
        {stores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stores.map((store) => (
              <StoreCard
                key={store.id}
                store={store}
                onRate={handleRatingSubmit}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Stores Found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search filters to find stores</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-150"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Statistics Footer */}
        {stores.length > 0 && (
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {stores.length}
                </div>
                <div className="text-sm text-gray-600">Total Stores</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {(stores.reduce((sum, s) => sum + (s.overallRating || 0), 0) / stores.length).toFixed(1)}
                </div>
                <div className="text-sm text-gray-600">Avg Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {stores.reduce((sum, s) => sum + (s.totalRatings || 0), 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Ratings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {stores.filter(s => s.userRating > 0).length}
                </div>
                <div className="text-sm text-gray-600">Your Ratings</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreList;