// import { useEffect, useState } from "react";
// import { adminAPI } from "../../utils/api";

// const UserList = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [filters, setFilters] = useState({
//     name: "",
//     email: "",
//     address: "",
//     role: "",
//   });

//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await adminAPI.getUsers(filters);
//         setUsers(response.data.usersWithRatings);
//       } catch (err) {
//         console.error("Error fetching users:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, [filters]);

//   const handleFilterChange = (e) => {
//     setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   return (
//     <div className="bg-white shadow overflow-auto sm:rounded-lg">
//       <div className="px-4 py-5 sm:px-6">
//         <h3 className="text-lg leading-6 font-medium text-gray-900">Users</h3>

//         <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Filter by name"
//             value={filters.name}
//             onChange={handleFilterChange}
//             className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//           />
//           <input
//             type="text"
//             name="email"
//             placeholder="Filter by email"
//             value={filters.email}
//             onChange={handleFilterChange}
//             className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//           />
//           <input
//             type="text"
//             name="address"
//             placeholder="Filter by address"
//             value={filters.address}
//             onChange={handleFilterChange}
//             className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//           />
//           <select
//             name="role"
//             value={filters.role}
//             onChange={handleFilterChange}
//             className="border border-gray-300 rounded-md px-3 py-2 text-sm"
//           >
//             <option value="">All Roles</option>
//             <option value="SYSTEM_ADMIN">System Admin</option>
//             <option value="NORMAL_USER">Normal User</option>
//             <option value="STORE_OWNER">Store Owner</option>
//           </select>
//         </div>
//       </div>

//       {loading ? (
//         <div className="flex justify-center items-center h-32">
//           <div className="spinner"></div>
//         </div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Name
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Email
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Address
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Role
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Rating
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {users.length > 0 &&
//                 users.map((user) => (
//                   <tr key={user.id}>
//                     <td className="px-6 py-3 text-left whitespace-nowrap text-sm font-medium text-gray-900">
//                       {user.name}
//                     </td>
//                     <td className="px-6 py-3 text-left whitespace-nowrap text-sm font-medium text-gray-900">
//                       {user.email}
//                     </td>
//                     <td className="px-6 py-3 text-left whitespace-nowrap text-sm font-medium text-gray-900">
//                       {user.address}
//                     </td>
//                     <td className="px-6 py-3 text-left whitespace-nowrap text-sm font-medium text-gray-900">
//                       <span
//                         className={`inline-flex px-2 text-xs font-semibold rounded-full ${
//                           user.role === "SYSTEM_ADMIN"
//                             ? "bg-purple-100 text-purple-800"
//                             : user.role === "STORE_OWNER"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-blue-100 text-blue-800"
//                         }`}
//                       >
//                         {user.role}
//                       </span>
//                     </td>
//                     <td className="px-6 py-3 text-left whitespace-nowrap text-sm font-medium text-gray-900">
//                       {user.ownedStore[0]?.ratings
//                         ? `${
//                             user.ownedStore[0]?.ratings.reduce(
//                               (sum, r) => sum + r.rating,
//                               0
//                             ) / user.ownedStore[0]?.ratings.length
//                           }`
//                         : "N/A"}
//                     </td>
//                   </tr>
//                 ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserList;
import { useEffect, useState } from "react";

// Mock API for demonstration
const adminAPI = {
  getUsers: async (filters) => {
    await new Promise(resolve => setTimeout(resolve, 1200));
    // Simulate filtered results
    const allUsers = [
      { id: 1, name: "John Doe", email: "john@example.com", address: "123 Main St, New York", role: "NORMAL_USER", ownedStore: [] },
      { id: 2, name: "Jane Smith", email: "jane@example.com", address: "456 Oak Ave, Los Angeles", role: "STORE_OWNER", ownedStore: [{ ratings: [{ rating: 4.5 }, { rating: 4.8 }, { rating: 4.2 }] }] },
      { id: 3, name: "Admin User", email: "admin@example.com", address: "789 Pine Rd, Chicago", role: "SYSTEM_ADMIN", ownedStore: [] },
      { id: 4, name: "Bob Wilson", email: "bob@example.com", address: "321 Elm St, Houston", role: "STORE_OWNER", ownedStore: [{ ratings: [{ rating: 5.0 }, { rating: 4.9 }] }] },
      { id: 5, name: "Alice Brown", email: "alice@example.com", address: "654 Maple Dr, Phoenix", role: "NORMAL_USER", ownedStore: [] },
    ];
    return { data: { usersWithRatings: allUsers } };
  }
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await adminAPI.getUsers(filters);
        setUsers(response.data.usersWithRatings);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Failed to load users. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      email: "",
      address: "",
      role: "",
    });
  };

  if (loading && users.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Error Loading Users</h3>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
          <p className="text-gray-600">View and filter platform users</p>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {(filters.name || filters.email || filters.address || filters.role) && (
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Search by name..."
                value={filters.name}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Search by email..."
                value={filters.email}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Search by address..."
                value={filters.address}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={filters.role}
                onChange={handleFilterChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Roles</option>
                <option value="SYSTEM_ADMIN">System Admin</option>
                <option value="NORMAL_USER">Normal User</option>
                <option value="STORE_OWNER">Store Owner</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Users {users.length > 0 && `(${users.length})`}
              </h3>
              {loading && (
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="animate-spin h-4 w-4 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">
                              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{user.address}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            user.role === "SYSTEM_ADMIN"
                              ? "bg-purple-100 text-purple-800"
                              : user.role === "STORE_OWNER"
                              ? "bg-green-100 text-green-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {user.role.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.ownedStore[0]?.ratings ? (
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-sm font-medium text-gray-900">
                              {(
                                user.ownedStore[0].ratings.reduce((sum, r) => sum + r.rating, 0) /
                                user.ownedStore[0].ratings.length
                              ).toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-500 ml-1">
                              ({user.ownedStore[0].ratings.length})
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">N/A</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-gray-600 font-medium mb-1">No users found</p>
                        <p className="text-sm text-gray-500">Try adjusting your filters</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Card */}
        {users.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {users.filter(u => u.role === 'NORMAL_USER').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Normal Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.role === 'STORE_OWNER').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Store Owners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {users.filter(u => u.role === 'SYSTEM_ADMIN').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">System Admins</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;