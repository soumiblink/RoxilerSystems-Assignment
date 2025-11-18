import { useState } from "react";
import { authAPI } from "../../utils/api";
import { useAuth } from "../../context/AuthContext";

const PasswordUpdate = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);

  const { updatePassword } = useAuth();

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

    if (formData.newPassword !== formData.confirmPassword) {
      setError(["New passwords do not match"]);
      return;
    }

    setLoading(true);

    const response = await updatePassword(
      formData.currentPassword,
      formData.newPassword
    );

    if (response.success) {
      setMessage(["Password updated successfully"]);
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } else {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
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
        <label className="block text-sm font-medium text-gray-700">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
          minLength={8}
          maxLength={16}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          8-16 characters, at least one uppercase, one special and one numeric
          character
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          minLength={8}
          maxLength={16}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          required
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
};

export default PasswordUpdate;
