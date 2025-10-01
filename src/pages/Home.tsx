// src/pages/Home.tsx
import { useState } from "react";
import Layout from "../components/Layout";
import MapView from "../components/MapView";
import VendorList from "../components/VendorList";
import AddVendorModal from "../components/AddVendorModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const { user, logout } = useAuth();

  return (
    <Layout>
      {/* دکمه افزودن وندور */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
        >
          افزودن وندور +
        </button>
      </div>

      {/* محتوای اصلی */}
      <main className="p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-0">
        <section className="md:col-span-2 h-[70vh] rounded-lg overflow-hidden shadow relative z-0">
          <MapView />
        </section>

        <aside className="md:col-span-1 space-y-4 relative z-0">
          {/* دیگه searchQuery به VendorList پاس داده نمیشه */}
          <VendorList />
        </aside>
      </main>

      {/* Toast */}
      <ToastContainer position="bottom-right" />

      {/* مودال افزودن وندور */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <AddVendorModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      )}
    </Layout>
  );
}
