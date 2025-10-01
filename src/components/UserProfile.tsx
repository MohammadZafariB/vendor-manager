// src/components/UserProfile.tsx
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null; // اگر لاگین نباشد، پروفایل نشان داده نمی‌شود

  return (
    <div
      className="flex items-center gap-2 cursor-pointer hover:opacity-80"
      onClick={() => navigate("/personal-info")}
    >
      <img
        src={user.user_metadata?.avatar_url || "/default-avatar.png"}
        alt="User Avatar"
        className="w-8 h-8 rounded-full border"
      />
      <span>{user.user_metadata?.full_name || "کاربر"}</span>
    </div>
  );
}
