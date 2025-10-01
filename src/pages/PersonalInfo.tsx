// src/pages/PersonalInfo.tsx
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { supabase } from "../supabaseClient";
import { useVendors } from "../contexts/VendorContext";
import { toast } from "react-toastify";

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

  // 📌 آپلود تصویر پروفایل
// 📌 handleUpload اصلاح شده
const handleUpload = async () => {
  if (!file || !user) return;

  const fileExt = file.name.split(".").pop();
  const filePath = `avatars/${user.id}-${Date.now()}.${fileExt}`; // مسیر یکتا داخل پوشه avatars

  setUploading(true);

  // آپلود فایل به bucket avatars
  const { error: uploadError } = await supabase.storage
    .from("avatars") // اطمینان از وجود bucket با همین نام
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (uploadError) {
    toast.error("آپلود تصویر با خطا مواجه شد: " + uploadError.message);
    setUploading(false);
    return;
  }

 // گرفتن لینک عمومی بدون ارجاع به error
const { data: publicUrlData } = supabase.storage
  .from("avatars")
  .getPublicUrl(filePath);

if (!publicUrlData?.publicUrl) {
  toast.error("دریافت لینک عمومی تصویر با خطا مواجه شد.");
  setUploading(false);
  return;
}

const publicUrl = publicUrlData.publicUrl;
setAvatarUrl(publicUrl);

// ذخیره لینک در پروفایل
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


  // 📌 ذخیره تغییرات نام و اطلاعات پروفایل
  const handleSave = async () => {
    if (!user) return;

    const updates: any = {
      id: user.id,
      name,
      updated_at: new Date(),
      avatar_url: avatarUrl, // همیشه ذخیره شود
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
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        اطلاعات شخصی
      </h2>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex flex-col items-center">
          <img
            src={avatarUrl || "/default-avatar.png"}
            alt="Avatar"
            className="w-32 h-32 rounded-full object-cover border mb-2"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/default-avatar.png";
            }}
          />
          {isEditing && (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                disabled={uploading}
                className="text-sm"
              />
              <button
                onClick={handleUpload}
                disabled={!file || uploading}
                className="mt-2 px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
              >
                {uploading ? "در حال آپلود..." : "آپلود تصویر"}
              </button>
            </>
          )}
        </div>

        <div className="flex-1 w-full">
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              نام
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              className="mt-1 w-full p-2 border rounded bg-gray-100 dark:bg-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              ایمیل
            </label>
            <p className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">
              {user?.email}
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 font-medium">
              تعداد وندورها
            </label>
            <p className="mt-1 p-2 bg-gray-100 dark:bg-gray-700 rounded">
              {vendorCount}
            </p>
          </div>

          <div className="flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  ذخیره
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  انصراف
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                ویرایش اطلاعات
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
