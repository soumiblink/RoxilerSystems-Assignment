// import { useState } from "react";
// import { adminAPI } from "../../utils/api";

// const AddUserForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     address: "",
//     role: "NORMAL_USER",
//   });

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError([]);
//     setMessage("");
//     setLoading(true);

//     const response = await adminAPI.createUser(formData);

//     if (response.success) {
//       setMessage(response.message);
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         address: "",
//         role: "NORMAL_USER",
//       });
//     } else {
//       setError(response.error);
//     }

//     setLoading(false);
//   };
//   return (
//     <div className="bg-white shadow sm:rounded-lg">
//       <div className="px-4 py-5 sm:p-6">
//         <h3 className="text-lg leading-6 font-medium text-gray-900">
//           Add New User
//         </h3>

//         <form onSubmit={handleSubmit} className="mt-6 space-y-6">
//           {message && (
//             <div className="bg-green-100 border border-green-400 text-gray-700 px-4 py-3 rounded">
//               {message}
//             </div>
//           )}

//           {error.length > 0 && (
//             <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//               {error.map((err, index) => (
//                 <div key={index}>{err}</div>
//               ))}
//             </div>
//           )}

//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               required
//               minLength={20}
//               maxLength={60}
//               value={formData.name}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter full name (20-60 characters)"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="email"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               required
//               value={formData.email}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter email"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="password"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               name="password"
//               id="password"
//               required
//               minLength={8}
//               maxLength={16}
//               value={formData.password}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter Password"
//             />
//             <p className="mt-1 text-sm text-gray-500">
//               8-16 characters, must include at least one uppercase letter and
//               one special character
//             </p>
//           </div>

//           <div>
//             <label
//               htmlFor="address"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Address
//             </label>
//             <textarea
//               name="address"
//               id="address"
//               rows={3}
//               required
//               maxLength={400}
//               value={formData.address}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//               placeholder="Enter Address"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="role"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Role
//             </label>
//             <select
//               name="role"
//               id="role"
//               value={formData.value}
//               onChange={handleChange}
//               className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//             >
//               <option value="NORMAL_USER">Normal User</option>
//               <option value="STORE_OWNER">Store Owner</option>
//               <option value="SYSTEM_ADMIN">System Admin</option>
//             </select>
//           </div>

//           <div>
//             <button
//               type="submit"
//               disabled={loading}
//               className="inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
//             >
//               {loading ? "Adding User..." : "Add User"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddUserForm;
import { useState } from "react";

// Mock API for demonstration
const adminAPI = {
  createUser: async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      message: "User created successfully!"
    };
  }
};

const AddUserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "NORMAL_USER",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (message || error.length > 0) {
      setMessage("");
      setError([]);
    }
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.address) {
      setError(["Please fill in all required fields"]);
      return;
    }

    if (formData.name.length < 20 || formData.name.length > 60) {
      setError(["Full name must be between 20 and 60 characters"]);
      return;
    }

    if (formData.password.length < 8 || formData.password.length > 16) {
      setError(["Password must be between 8 and 16 characters"]);
      return;
    }

    setError([]);
    setMessage("");
    setLoading(true);

    try {
      const response = await adminAPI.createUser(formData);

      if (response.success) {
        setMessage(response.message);
        setFormData({
          name: "",
          email: "",
          password: "",
          address: "",
          role: "NORMAL_USER",
        });
      } else {
        setError(Array.isArray(response.error) ? response.error : [response.error]);
      }
    } catch (err) {
      setError(["An unexpected error occurred. Please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      address: "",
      role: "NORMAL_USER",
    });
    setMessage("");
    setError([]);
  };

  const getPasswordStrength = () => {
    const { password } = formData;
    if (!password) return null;
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;

    if (strength <= 2) return { label: "Weak", color: "red" };
    if (strength <= 3) return { label: "Fair", color: "yellow" };
    if (strength <= 4) return { label: "Good", color: "blue" };
    return { label: "Strong", color: "green" };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900">
            Add New User
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Create a new user account with role assignment
          </p>
        </div>

        <div className="px-6 py-6">
          {message && (
            <div className="mb-6 bg-green-50 border-l-4 border-green-400 p-4 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">{message}</p>
                </div>
              </div>
            </div>
          )}

          {error.length > 0 && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <div className="text-sm text-red-800">
                    {error.map((err, index) => (
                      <p key={index} className="mb-1 last:mb-0">{err}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                minLength={20}
                maxLength={60}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name (20-60 characters)"
                className="block w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
              />
              <div className="mt-1.5 flex justify-between items-center">
                <p className="text-xs text-gray-500">Must be between 20-60 characters</p>
                <p className={`text-xs font-medium ${
                  formData.name.length < 20 && formData.name.length > 0 ? 'text-red-600' : 
                  formData.name.length > 60 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {formData.name.length}/60
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="user@example.com"
                className="block w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                name="password"
                id="password"
                minLength={8}
                maxLength={16}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (8-16 characters)"
                className="block w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
              />
              
              {passwordStrength && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-600">Password strength:</span>
                    <span className={`text-xs font-medium text-${passwordStrength.color}-600`}>
                      {passwordStrength.label}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`bg-${passwordStrength.color}-500 h-1.5 rounded-full transition-all duration-300`}
                      style={{
                        width: passwordStrength.label === "Weak" ? "25%" :
                               passwordStrength.label === "Fair" ? "50%" :
                               passwordStrength.label === "Good" ? "75%" : "100%",
                        backgroundColor: passwordStrength.color === "red" ? "#ef4444" :
                                       passwordStrength.color === "yellow" ? "#eab308" :
                                       passwordStrength.color === "blue" ? "#3b82f6" : "#22c55e"
                      }}
                    />
                  </div>
                </div>
              )}
              
              <p className="mt-2 text-xs text-gray-500">
                Must be 8-16 characters, include at least one uppercase letter and one special character
              </p>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                id="address"
                rows={4}
                maxLength={400}
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete address"
                className="block w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 resize-none"
              />
              <div className="mt-1.5 flex justify-between items-center">
                <p className="text-xs text-gray-500">Maximum 400 characters</p>
                <p className={`text-xs font-medium ${formData.address.length > 380 ? 'text-red-600' : 'text-gray-600'}`}>
                  {formData.address.length}/400
                </p>
              </div>
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                User Role <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="role"
                  id="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 appearance-none"
                >
                  <option value="NORMAL_USER">Normal User</option>
                  <option value="STORE_OWNER">Store Owner</option>
                  <option value="SYSTEM_ADMIN">System Admin</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 space-y-1">
                <p><strong>Normal User:</strong> Standard user access</p>
                <p><strong>Store Owner:</strong> Can manage stores and products</p>
                <p><strong>System Admin:</strong> Full system access</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 flex items-center"
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? "Adding User..." : "Add User"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;