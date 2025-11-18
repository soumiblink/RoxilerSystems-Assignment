// import { useState } from "react";
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
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const { updatePassword } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
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
      setMessage("Password updated successfully");
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

  const PasswordInput = ({ label, name, value, field }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPasswords[field] ? "text" : "password"}
          name={name}
          value={value}
          onChange={handleChange}
          required
          minLength={name !== "currentPassword" ? 8 : undefined}
          maxLength={name !== "currentPassword" ? 16 : undefined}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2.5 pr-10 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(field)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
        >
          {showPasswords[field] ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto">
      <div onSubmit={handleSubmit} className="space-y-5">
        {message && (
          <div className="bg-green-50 border-l-4 border-green-400 text-green-800 px-4 py-3 rounded-r shadow-sm flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>{message}</span>
          </div>
        )}

        {error.length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-400 text-red-800 px-4 py-3 rounded-r shadow-sm">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                {error.map((err, index) => (
                  <div key={index}>{err}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        <PasswordInput
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          field="current"
        />

        <PasswordInput
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          field="new"
        />
        <p className="text-xs text-gray-500 -mt-3 ml-1">
          8-16 characters, at least one uppercase, one special and one numeric character
        </p>

        <PasswordInput
          label="Confirm New Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          field="confirm"
        />

        <button
          type="submit"
          disabled={loading}
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 shadow-sm hover:shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Updating...
            </span>
          ) : (
            "Update Password"
          )}
        </button>
      </div>
    </div>
  );
};

export default PasswordUpdate;