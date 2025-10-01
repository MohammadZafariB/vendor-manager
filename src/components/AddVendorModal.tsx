import React, { useState } from "react";
import { useVendors } from "../contexts/VendorContext";
import { toast } from "react-toastify"; // فقط import toast
import { useAuth } from "../contexts/AuthContext";

interface AddVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddVendorModal({ isOpen, onClose }: AddVendorModalProps) {
  const { addVendor } = useVendors();
  const { user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    owner: "",
    lat: "",
    lng: "",
    logo: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "lat") {
      let num = parseFloat(value);
      if (num > 90) num = 90;
      if (num < -90) num = -90;
      setForm({ ...form, lat: num.toString() });
    } else if (name === "lng") {
      let num = parseFloat(value);
      if (num > 180) num = 180;
      if (num < -180) num = -180;
      setForm({ ...form, lng: num.toString() });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("برای افزودن وندور باید وارد حساب شوید", {
        position: "bottom-right",
        rtl: true,
      });
      return;
    }

    await addVendor({
      name: form.name,
      contact: form.contact,
      owner: form.owner,
      location_lat: Number(form.lat),
      location_lng: Number(form.lng),
      logo: form.logo,
      user_id: user.id,
    });

    toast.success("وندور با موفقیت اضافه شد!", {
        position: "bottom-right",
      rtl: true,
    });

    onClose();
    setForm({
      name: "",
      contact: "",
      owner: "",
      lat: "",
      lng: "",
      logo: "",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg relative z-60">
        <h2 className="text-lg font-semibold mb-4">افزودن وندور جدید</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="نام برند"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="owner"
            placeholder="نام صاحب برند"
            value={form.owner}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="contact"
            placeholder="شماره تماس"
            value={form.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="logo"
            placeholder="لینک لوگو"
            value={form.logo}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex gap-2">
            <input
              type="number"
              step="any"
              name="lat"
              placeholder="Latitude (-90 to 90)"
              value={form.lat}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
              min={-90}
              max={90}
              required
            />
            <input
              type="number"
              step="any"
              name="lng"
              placeholder="Longitude (-180 to 180)"
              value={form.lng}
              onChange={handleChange}
              className="w-1/2 p-2 border rounded"
              min={-180}
              max={180}
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              ذخیره
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
