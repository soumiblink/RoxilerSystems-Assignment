import { useEffect, useState } from "react";
import { adminAPI } from "../../utils/api";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getStores(filters);
      setStores(response.data.stores);
    } catch (err) {
      console.log("Error fetching stores:", err);
    } finally {
      setLoading(false);
    }
  };

  const hanldeFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="bg-white shadow overflow-auto sm: rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Stores</h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Filter by store name"
            value={filters.name}
            onChange={(e) => hanldeFilterChange("name", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />

          <input
            type="text"
            placeholder="Filter by email"
            value={filters.email}
            onChange={(e) => hanldeFilterChange("email", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />

          <input
            type="text"
            placeholder="Filter by address"
            value={filters.address}
            onChange={(e) => hanldeFilterChange("address", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Store Name
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Address
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Owner
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Average Rating
                </th>

                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Ratings
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stores.map((store) => (
                <tr key={store.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left font-medium text-gray-900">
                    {store.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left font-medium text-gray-900">
                    {store.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left font-medium text-gray-900">
                    {store.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-left font-medium text-gray-900">
                    {store.owner.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                    <div className="flex items-center">
                      <span className="text-yellow-400">★</span>
                      <span className="ml-1">
                        {store.ratings.length > 0
                          ? store.ratings.reduce(
                              (sum, r) => sum + r.rating,
                              0
                            ) / store.ratings.length
                          : "No ratings!"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                    {store.ratings.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StoreList;
