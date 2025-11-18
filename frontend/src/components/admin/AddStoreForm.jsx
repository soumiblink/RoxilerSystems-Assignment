// import { useEffect, useState } from "react";

// Mock API for demonstration
const adminAPI = {
  getUsers: async ({ role }) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      data: {
        usersWithRatings: [
          { id: "1", name: "Jonny Doe", email: "john@example.com" },
          { id: "2", name: "JakobSmith", email: "jane@example.com" },
          { id: "3", name: "Bobby Johnson", email: "bob@example.com" }
        ]
      }
    };
  },
  createStore: async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    return {
      success: true,
      message: "Store created successfully!"
    };
  }
};

const AddStoreForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: "",
  });

  const [storeOwners, setStoreOwners] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ownersLoading, setOwnersLoading] = useState(true);

  useEffect(() => {
    const fetchStoresData = async () => {
      try {
        const response = await adminAPI.getUsers({ role: "STORE_OWNER" });
        setStoreOwners(response.data.usersWithRatings);
      } catch (error) {
        setError(["Failed to load store owners"]);
      } finally {
        setOwnersLoading(false);
      }
    };
    fetchStoresData();
  }, []);

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
    if (!formData.name || !formData.email || !formData.address || !formData.ownerId) {
      setError(["Please fill in all required fields"]);
      return;
    }
    
    setError([]);
    setMessage("");
    setLoading(true);

    try {
      const response = await adminAPI.createStore(formData);
      if (response.success) {
        setMessage(response.message);
        setFormData({
          name: "",
          email: "",
          address: "",
          ownerId: "",
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
    setFormData({ name: "", email: "", address: "", ownerId: "" });
    setMessage("");
    setError([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-900">
            Add New Store
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            Fill in the details below to register a new store
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
                Store Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Downtown Electronics"
                className="block w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Store Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="store@example.com"
                className="block w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150"
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Store Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                id="address"
                rows={4}
                maxLength={400}
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete store address including street, city, state, and ZIP code"
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
              <label htmlFor="ownerId" className="block text-sm font-medium text-gray-700 mb-1">
                Store Owner <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="ownerId"
                  id="ownerId"
                  value={formData.ownerId}
                  onChange={handleChange}
                  disabled={ownersLoading}
                  className="block w-full border border-gray-300 rounded-md px-3 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none"
                >
                  <option value="">
                    {ownersLoading ? "Loading..." : "Select a store owner"}
                  </option>
                  {storeOwners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name} ({owner.email})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>
              
              {ownersLoading && (
                <p className="mt-2 text-sm text-gray-500 flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading store owners...
                </p>
              )}
              
              {storeOwners.length === 0 && !ownersLoading && (
                <div className="mt-2 bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r">
                  <p className="text-sm text-yellow-800">
                    ⚠️ No store owners found. Please create a store owner user first.
                  </p>
                </div>
              )}
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
              disabled={loading || ownersLoading || storeOwners.length === 0}
              className="px-6 py-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 flex items-center"
            >
              {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {loading ? "Adding Store..." : "Add Store"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddStoreForm;