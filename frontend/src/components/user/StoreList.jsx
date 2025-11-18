import { useEffect, useState } from "react";
import StoreCard from "./StoreCard";
import { storeAPI } from "../../utils/api";

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
  });

  useEffect(() => {
    fetchStores();
  }, [filters]);

  const fetchStores = async () => {
    setLoading(true);
    try {
      const response = await storeAPI.getStores(filters);
      setStores(response.data.storesWithRatings);
    } catch (err) {
      console.error("Error fetching stores:", err);
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

  const handleRatingSubmit = async (storeId, rating) => {
    try {
      await storeAPI.rateStore(storeId, rating);
      fetchStores();
    } catch (err) {
      console.error("Error submitting rating:", err);
      alert("Error in submitting rating");
    }
  };

  return (
    <div>
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={filters.name}
            placeholder="Search by store name"
            onChange={(e) => handleFilterChange("name", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
          />
          <input
            type="text"
            value={filters.address}
            placeholder="Search by store address"
            onChange={(e) => handleFilterChange("address", e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              onRate={handleRatingSubmit}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StoreList;
