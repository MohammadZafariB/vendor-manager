import { useState } from "react";
import Layout from "../components/Layout.tsx";
import MapView from "../components/MapView.tsx";
import VendorList from "../components/VendorList.tsx";
import AddVendorModal from "../components/AddVendorModal.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <div className="flex justify-end p-3 md:p-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white text-sm md:text-base px-3 md:px-4 py-2 rounded-lg shadow transition"
        >
          افزودن وندور +
        </button>
      </div>

      <main className="p-3 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 relative z-0">
        <section className="h-[60vh] md:h-[70vh] rounded-lg overflow-hidden shadow relative z-0 md:col-span-2">
          <MapView />
        </section>

        <aside className="space-y-4 relative z-0 md:col-span-1 mt-4 md:mt-0">
          <VendorList />
        </aside>
      </main>

      <ToastContainer position="bottom-right" />

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3">
          <div className="w-full max-w-md">
            <AddVendorModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
