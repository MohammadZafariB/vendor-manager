import { useState } from "react";
import { toast } from "react-toastify";
import { useVendors } from "../contexts/VendorContext.tsx";
import ConfirmModal from "./ConfirmModal.tsx";
import EditVendorModal from "./EditVendorModal.tsx";
import type { Vendor } from "../contexts/VendorContext.tsx"; // ✅ اضافه شد

export default function VendorList() {
  const {
    vendors,
    removeVendor,
    updateVendor,
    setSelectedVendorId,
    selectedVendorId,
    searchQuery, // ✅ گرفتن از context
  } = useVendors();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState<string | null>(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [vendorToEdit, setVendorToEdit] = useState<Vendor | null>(null);

  // ✅ فیلتر وندورها بر اساس searchQuery
  const filteredVendors = vendors.filter((v) =>
    v.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveEdit = async (updatedVendor: Vendor) => {
    await updateVendor(updatedVendor);
  toast.success("وندور با موفقیت ویرایش شد!", { position: "bottom-right", rtl: true });
    setIsEditModalOpen(false);
  };

  // حذف وندور
  const handleDeleteClick = (id: string) => {
    setVendorToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (vendorToDelete) {
      await removeVendor(vendorToDelete);
toast.success("وندور با موفقیت حذف شد!", {
  position: "bottom-right",
  rtl: true,
});      setVendorToDelete(null);
    }
    setIsDeleteModalOpen(false);
  };

  // ویرایش وندور
  const handleEditClick = (vendor: Vendor) => {
    setVendorToEdit(vendor);
    setIsEditModalOpen(true);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-3">لیست وندورها</h2>

      {filteredVendors.length === 0 ? (
        <p className="text-gray-500">هیچ وندوری با این نام پیدا نشد.</p>
      ) : (
        <ul className="space-y-2">
          {filteredVendors.map((v) => (
            <li
              key={v.id}
              onClick={() => setSelectedVendorId(v.id)}
              className={`p-3 border rounded flex justify-between items-center cursor-pointer transition 
                ${
                  selectedVendorId === v.id
                    ? "bg-green-200 dark:bg-green-700"
                    : "hover:bg-green-100 dark:hover:bg-green-700"
                }`}
            >
              {/* لوگو + اطلاعات */}
              <div className="flex items-center gap-3">
                {v.logo && (
                  <img
                    src={v.logo}
                    alt={v.name}
                    className="w-10 h-10 object-cover rounded-full border"
                  />
                )}
                <div>
                  <p className="font-bold">{v.name}</p>
                  {v.contact && (
                    <p className="text-sm text-gray-600">📞 {v.contact}</p>
                  )}
                  {v.owner && <p className="text-sm">👤 {v.owner}</p>}
                  {v.location_lat && v.location_lng && (
                    <p className="text-xs text-gray-500">
                      📍 lat: {v.location_lat}, lng: {v.location_lng}
                    </p>
                  )}
                </div>
              </div>

              {/* دکمه‌ها */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditClick(v);
                  }}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  ویرایش
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteClick(v.id);
                  }}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* مدال تأیید حذف */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        message="آیا مطمئن هستید که می‌خواهید این وندور را حذف کنید؟"
      />

      {/* مدال ویرایش */}
      <EditVendorModal
        isOpen={isEditModalOpen}
        vendor={vendorToEdit}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
      />
    </div>
  );
}
