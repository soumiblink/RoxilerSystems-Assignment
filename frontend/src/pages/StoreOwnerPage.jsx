// import { useEffect, useState } from "react";
// import PasswordUpdate from "../components/common/PasswordUpdate";
// import { storeAPI } from "../utils/api";

// const StoreOwnerPage = () => {
//   const [dashboardData, setDashboarData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const response = await storeAPI.getOwnerDashboard();
//         setDashboarData(response.data.storesWithAvgRating[0]);
//       } catch (err) {
//         console.error("Error fetching store owner dashboard", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDashboardData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   if (!dashboardData) {
//     return (
//       <div className="flex justify-center items-center h-64 text-lg font-medium">
//         Error loading dashboard!
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div className="bg-white shadow sm:rounded-lg">
//         <div className="px-4 py-5 sm:p-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             Update Password
//           </h3>
//           <div className="mt-2 max-w-full flex justify-center text-sm text-gray-500">
//             <PasswordUpdate />
//           </div>
//         </div>
//       </div>

//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-3 py-5 sm:px-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             Store Information
//           </h3>
//         </div>
//         <div className="border-t border-gray-200 px-4 py-5 sm:p-8">
//           <dl className="sm:divide-y sm:divide-gray-200">
//             <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Store Name</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                 {dashboardData.store.name}
//               </dd>
//             </div>

//             <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Email</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                 {dashboardData.store.email}
//               </dd>
//             </div>

//             <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">Address</dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                 {dashboardData.store.address}
//               </dd>
//             </div>

//             <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">
//                 Average Rating
//               </dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                 {dashboardData.averageRating
//                   ? dashboardData.averageRating.toFixed(1)
//                   : "No ratings yet!"}
//               </dd>
//             </div>

//             <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
//               <dt className="text-sm font-medium text-gray-500">
//                 Total Ratings
//               </dt>
//               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
//                 {dashboardData.totalRatings}
//               </dd>
//             </div>
//           </dl>
//         </div>
//       </div>

//       <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//         <div className="px-4 py-5 sm:px-6">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             User Ratings
//           </h3>
//         </div>

//         <div className="border-t border-gray-200">
//           <ul className="divide-y divide-gray-200">
//             {dashboardData.ratings.map((rating, index) => (
//               <li key={index} className="px-4 py-4 sm:px-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center">
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">
//                         {rating.userName}
//                       </div>
//                       <div>{rating.userEmail}</div>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="text-yellow-400 text-lg">
//                       {"★".repeat(rating.rating)}
//                       {"☆".repeat(5 - rating.rating)}
//                     </div>
//                     <div>
//                       {new Date(rating.submittedAt).toLocaleDateString()}
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>

//           {dashboardData.ratings.length === 0 && (
//             <div className="px-4 py-8 text-center text-gray-500">
//               No ratings yet!
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StoreOwnerPage;
import { useEffect, useState } from "react";
import PasswordUpdate from "../components/common/PasswordUpdate";
import { storeAPI } from "../utils/api";

const StoreOwnerPage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await storeAPI.getOwnerDashboard();
        setDashboardData(response.data.storesWithAvgRating[0]);
      } catch (err) {
        console.error("Error fetching store owner dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const tabs = [
    { 
      id: "overview", 
      name: "Overview",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    { 
      id: "ratings", 
      name: "Ratings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    { 
      id: "settings", 
      name: "Settings",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex justify-center items-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">Error Loading Dashboard</h3>
            <p className="mt-2 text-sm text-gray-500">Unable to fetch your store information. Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Average Rating</p>
                    <p className="text-3xl font-bold mt-2">
                      {dashboardData.averageRating ? dashboardData.averageRating.toFixed(1) : "N/A"}
                    </p>
                  </div>
                  <div className="bg-blue-400 bg-opacity-30 rounded-full p-3">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Total Ratings</p>
                    <p className="text-3xl font-bold mt-2">{dashboardData.totalRatings}</p>
                  </div>
                  <div className="bg-green-400 bg-opacity-30 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm font-medium">Store Status</p>
                    <p className="text-xl font-bold mt-2">Active</p>
                  </div>
                  <div className="bg-purple-400 bg-opacity-30 rounded-full p-3">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Information Card */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h3 className="text-xl font-bold text-white">Store Information</h3>
              </div>
              <div className="p-6">
                <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div className="border-l-4 border-blue-500 pl-4">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Store Name</dt>
                    <dd className="text-lg font-semibold text-gray-900">{dashboardData.store.name}</dd>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Email</dt>
                    <dd className="text-lg font-semibold text-gray-900">{dashboardData.store.email}</dd>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-4 sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500 mb-1">Address</dt>
                    <dd className="text-lg font-semibold text-gray-900">{dashboardData.store.address}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        );

      case "ratings":
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Customer Ratings</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {dashboardData.ratings.map((rating, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full p-3 text-white font-bold text-lg">
                        {rating.userName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="text-base font-semibold text-gray-900">{rating.userName}</div>
                        <div className="text-sm text-gray-500">{rating.userEmail}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-1 text-2xl mb-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < rating.rating ? "text-yellow-400" : "text-gray-300"}>
                            ★
                          </span>
                        ))}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(rating.submittedAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {dashboardData.ratings.length === 0 && (
                <div className="py-16 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                  <p className="mt-4 text-gray-500 font-medium">No ratings yet!</p>
                  <p className="mt-1 text-sm text-gray-400">Your first customer rating will appear here</p>
                </div>
              )}
            </div>
          </div>
        );

      case "settings":
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white">Account Settings</h3>
            </div>
            <div className="p-6">
              <div className="max-w-2xl mx-auto">
                <PasswordUpdate />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Store Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Welcome back, {dashboardData.store.name}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-green-50 px-4 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Navigation */}
          <nav className="flex space-x-1 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg transform -translate-y-1"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`}
              >
                <span className={activeTab === tab.id ? "text-white" : "text-gray-500"}>
                  {tab.icon}
                </span>
                <span>{tab.name}</span>
                {activeTab === tab.id && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-fadeIn">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default StoreOwnerPage;