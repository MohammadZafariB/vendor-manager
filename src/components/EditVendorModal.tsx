import { useState, useEffect } from "react";
import type { Vendor } from "../contexts/VendorContext.tsx";

interface EditVendorModalProps {
  isOpen: boolean;
  vendor: Vendor | null;
  onClose: () => void;
  onSave: (updatedVendor: Vendor) => void;
}

export default function EditVendorModal({ isOpen, vendor, onClose, onSave }: EditVendorModalProps) {
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [contact, setContact] = useState("");
  const [lat, setLat] = useState<number | "">("");
  const [lng, setLng] = useState<number | "">("");
  const [logo, setLogo] = useState("");

  useEffect(() => {
    if (vendor) {
      setName(vendor.name);
      setOwner(vendor.owner || "");
      setContact(vendor.contact || "");
      setLat(vendor.location_lat ?? "");
      setLng(vendor.location_lng ?? "");
      setLogo((vendor as any).logo || ""); // اگر ستون لوگو دارید
    }
  }, [vendor]);

  if (!isOpen || !vendor) return null;

  const handleSave = () => {
    onSave({
      ...vendor,
      name,
      owner: owner || undefined,
      contact: contact || undefined,
      location_lat: lat === "" ? undefined : Number(lat),
      location_lng: lng === "" ? undefined : Number(lng),
      logo: logo || undefined, // ذخیره لوگو
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">ویرایش وندور</h2>

        <input
          type="text"
          placeholder="نام"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="مالک"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="تماس"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="عرض جغرافیایی"
          value={lat}
          onChange={(e) => setLat(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="طول جغرافیایی"
          value={lng}
          onChange={(e) => setLng(e.target.value === "" ? "" : Number(e.target.value))}
          className="w-full mb-2 p-2 border rounded"
        />

        {/* فیلد لوگو */}
        <input
          type="text"
          placeholder="آدرس لوگو"
          value={logo}
          onChange={(e) => setLogo(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />

        {/* پیش‌نمایش لوگو */}
        {logo && (
          <div className="mb-2">
            <img src={logo} alt="لوگو" className="w-20 h-20 object-contain rounded border" />
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            انصراف
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            ذخیره
          </button>
        </div>
      </div>
    </div>
  );
}
