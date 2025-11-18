import { useEffect, useState } from "react";
import { adminAPI } from "../../utils/api";

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
        setError("Failed to load store owners");
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError([]);
    setMessage("");
    setLoading(true);

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
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          Add New Store
        </h3>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {message && (
            <div className="bg-green-100 border-green-400 text-green-700 px-4 py-3 rounded">
              {message}
            </div>
          )}

          {error.length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error.map((err, index) => (
                <div key={index}>{err}</div>
              ))}
            </div>
          )}

          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Store Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter store name"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Store Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter store email"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Store Address
            </label>
            <textarea
              name="address"
              id="address"
              required
              rows={3}
              maxLength={400}
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter store address"
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <p className="mt-1 text-sm text-gray-500">
              {formData.address.length}/400 characters
            </p>
          </div>

          <div>
            <label
              htmlFor="ownerId"
              className="block text-sm font-medium text-gray-700"
            >
              Store Owner
            </label>
            <select
              name="ownerId"
              id="ownerId"
              required
              value={formData.ownerId}
              onChange={handleChange}
              disabled={ownersLoading}
              className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select a store owner</option>
              {storeOwners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>
            {ownersLoading && (
              <p className="mt-1 text-sm text-gray-500">Loading store owners</p>
            )}
            {storeOwners.length === 0 && !ownersLoading && (
              <p className="mt-1 text-sm text-yellow-600">
                No store owners found. Please create a store owner user first.
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || ownersLoading || storeOwners.length === 0}
              className="inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Adding Store..." : "Add Store"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStoreForm;
