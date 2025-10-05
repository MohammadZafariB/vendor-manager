import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LogoutButton() {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/landing");
  };

  return (
    <div>
      <button
        onClick={() => setIsConfirmOpen(true)}
        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
      >
        خروج از حساب
      </button>

      {isConfirmOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4 text-black">
              آیا مطمئن هستید که می‌خواهید خارج شوید؟
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
              >
                خیر
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                بله، خارج شو
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
