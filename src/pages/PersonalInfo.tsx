import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext.tsx";
import { supabase } from "../supabaseClient.ts";
import { useVendors } from "../contexts/VendorContext.tsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PersonalInfo() {
  const { user, setUser } = useAuth();
  const { vendors } = useVendors();

  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/default-avatar.png");
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error.message);
          setAvatarUrl("/default-avatar.png");
        } else if (data) {
          setName(data.name || "");
          setAvatarUrl(data.avatar_url || "/default-avatar.png");
        }
      };
      fetchProfile();
    }
  }, [user]);

  const handleUpload = async () => {
    if (!file || !user) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`;
    setUploading(true);

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    if (uploadError) {
      toast.error("آپلود تصویر با خطا مواجه شد: " + uploadError.message);
      setUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(filePath);
    if (!publicUrlData?.publicUrl) {
      toast.error("دریافت لینک عمومی تصویر با خطا مواجه شد.");
      setUploading(false);
      return;
    }

    const publicUrl = publicUrlData.publicUrl;
    setAvatarUrl(publicUrl);

    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", user.id);

    if (updateError) {
      toast.error("ذخیره تصویر در پروفایل با خطا مواجه شد.");
    } else {
      toast.success("تصویر با موفقیت آپلود شد!");
      setUser({ ...user, avatar_url: publicUrl });
    }

    setUploading(false);
  };

  const handleSave = async () => {
    if (!user) return;

    const updates: any = {
      id: user.id,
      name,
      updated_at: new Date(),
      avatar_url: avatarUrl,
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      toast.error("ذخیره اطلاعات با خطا مواجه شد: " + error.message);
    } else {
      toast.success("اطلاعات با موفقیت به‌روز شد!");
      setIsEditing(false);
      setUser({ ...user, name, avatar_url: avatarUrl });
    }
  };

  const vendorCount = vendors.filter((v) => v.user_id === user?.id).length;

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-6 space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-200">اطلاعات شخصی</h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-col items-center w-full md:w-auto">
          <img
            src={avatarUrl || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 sm:w-32 h-24 sm:h-32 rounded-full object-cover border mb-2"
            onError={(e) => ((e.target as HTMLImageElement).src = "/default-avatar.png")}
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={uploading}
                className="text-sm mt-2"
              />
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="mt-2 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
              >
                {uploading ? "در حال آپلود..." : "آپلود تصویر"}
              </button>
            </>
          )}
        </div>

        <div className="flex-1 w-full space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base mb-1">
              نام
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="mt-1 w-full p-2 text-sm sm:text-base border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base mb-1">
              ایمیل
            </label>
            <p className="mt-1 p-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 rounded">{user?.email}</p>
          </div>

          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base mb-1">
              تعداد وندورها
            </label>
            <p className="mt-1 p-2 text-sm sm:text-base bg-gray-100 dark:bg-gray-700 rounded">{vendorCount}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm sm:text-base"
                >
                  ذخیره
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 text-sm sm:text-base"
                >
                  انصراف
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm sm:text-base"
              >
                ویرایش اطلاعات
              </button>
            )}
          </div>
        </div>
      </div>

      <section className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">اطلاعات تکمیلی</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm">تاریخ عضویت</label>
            <p className="mt-1 p-2 bg-white dark:bg-gray-800 rounded text-sm">
              {user?.created_at?.split("T")[0]}
            </p>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm">وضعیت حساب</label>
            <p className="mt-1 p-2 bg-white dark:bg-gray-800 rounded text-sm">
              {user?.is_active ? "فعال" : "غیرفعال"}
            </p>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm">نقش کاربری</label>
            <p className="mt-1 p-2 bg-white dark:bg-gray-800 rounded text-sm">{user?.role || "کاربر"}</p>
          </div>
          <div>
            <label className="block text-gray-600 dark:text-gray-300 text-sm">شماره تماس</label>
            <p className="mt-1 p-2 bg-white dark:bg-gray-800 rounded text-sm">{user?.phone || "-"}</p>
          </div>
        </div>
      </section>

      <ToastContainer position="top-center" />
    </div>
  );
}
