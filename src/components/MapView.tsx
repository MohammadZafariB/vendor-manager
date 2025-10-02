import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useVendors } from "../contexts/VendorContext.tsx";
import L from "leaflet";

function MapCenter({ position }: { position?: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 0.8 }); // زوم روی وندور انتخابی
    }
  }, [position, map]);
  return null;
}

export default function MapView() {
  const { vendors, selectedVendorId } = useVendors();

  const selected = vendors.find((v) => v.id === selectedVendorId);

  return (
    <MapContainer
      center={[35.7, 51.4]} // مرکز اولیه (تهران)
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* مارکر همه وندورها */}
      {vendors.map((v) => {
        if (!v.location_lat || !v.location_lng) return null;

        // 📌 اگر وندور لوگو داشته باشد، از آن استفاده می‌کنیم
        const customIcon = v.logo
          ? L.icon({
              iconUrl: v.logo,
              iconSize: [40, 40], // اندازه لوگو
              iconAnchor: [20, 40],
              popupAnchor: [0, -40],
              className: "rounded-full border border-gray-300", // دایره‌ای و شیک
            })
          : L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", // آیکون پیش‌فرض
              shadowUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            });

        return (
          <Marker
            key={v.id}
            position={[v.location_lat, v.location_lng]}
            icon={customIcon}
          >
            <Popup>
              <div className="min-w-[150px]">
                <strong>{v.name}</strong>
                {v.contact && <div>📞 {v.contact}</div>}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* وقتی وندور انتخاب شد → پرواز روی مختصاتش */}
      <MapCenter
        position={
          selected && selected.location_lat && selected.location_lng
            ? [selected.location_lat, selected.location_lng]
            : null
        }
      />
    </MapContainer>
  );
}
