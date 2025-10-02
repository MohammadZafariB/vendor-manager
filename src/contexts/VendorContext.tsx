import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient.ts";
import { useAuth } from "./AuthContext.tsx"; 

// تعریف نوع Vendor
export type Vendor = {
  id: string;
  name: string;
  owner?: string;
  contact?: string;
  location_lat?: number;
  location_lng?: number;
  logo?: string;
  created_at?: string;
  user_id?: string; 
};

type VendorContextType = {
  vendors: Vendor[];
  addVendor: (vendor: Omit<Vendor, "id" | "created_at" >) => Promise<void>;
  removeVendor: (id: string) => Promise<void>;
  updateVendor: (vendor: Vendor) => Promise<void>;
  selectedVendorId: string | null;
  setSelectedVendorId: (id: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
};

const VendorContext = createContext<VendorContextType | undefined>(undefined);

export const VendorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [selectedVendorId, setSelectedVendorId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // 🔹 اضافه شد
  const { user } = useAuth();

  // بارگذاری Vendorها فقط برای کاربر جاری
  useEffect(() => {
    const fetchVendors = async () => {
      if (!user) {
        setVendors([]);
        return;
      }

      const { data, error } = await supabase
        .from("vendors")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error && data) {
        setVendors(data);
      } else {
        console.error("Error fetching vendors:", error?.message);
      }
    };

    fetchVendors();
  }, [user]);

  // افزودن وندور
  const addVendor = async (vendor: Omit<Vendor, "id" | "created_at" >) => {
    if (!user) return;

    const { data, error } = await supabase
      .from("vendors")
      .insert([{ ...vendor, user_id: user.id }])
      .select();

    if (error) {
      console.error("Supabase insert error:", error.message);
      return;
    }

    if (data) {
      setVendors((prev) => [data[0], ...prev]);
    }
  };

  // حذف وندور
  const removeVendor = async (id: string) => {
    const { error } = await supabase.from("vendors").delete().eq("id", id);

    if (!error) {
      setVendors((prev) => prev.filter((v) => v.id !== id));
      if (selectedVendorId === id) setSelectedVendorId(null);
    } else {
      console.error("Error deleting vendor:", error.message);
    }
  };

  // ویرایش وندور
  const updateVendor = async (vendor: Vendor) => {
    const { error } = await supabase
      .from("vendors")
      .update({
        name: vendor.name,
        owner: vendor.owner,
        contact: vendor.contact,
        location_lat: vendor.location_lat,
        location_lng: vendor.location_lng,
        logo: vendor.logo,
      })
      .eq("id", vendor.id)
      .eq("user_id", user?.id);

    if (!error) {
      setVendors((prev) =>
        prev.map((v) => (v.id === vendor.id ? { ...v, ...vendor } : v))
      );
    } else {
      console.error("Error updating vendor:", error.message);
    }
  };

  return (
    <VendorContext.Provider
      value={{
        vendors,
        addVendor,
        removeVendor,
        updateVendor,
        selectedVendorId,
        setSelectedVendorId,
        searchQuery,       // 🔹 اضافه شد
        setSearchQuery,    // 🔹 اضافه شد
      }}
    >
      {children}
    </VendorContext.Provider>
  );
};

export const useVendors = () => {
  const context = useContext(VendorContext);
  if (!context) throw new Error("useVendors must be used within a VendorProvider");
  return context;
};
