import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import { useVendors } from "../contexts/VendorContext.tsx";
import L from "leaflet";

function MapCenter({ position }: { position?: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 10, { duration: 0.8 });
    }
  }, [position, map]);
  return null;
}

function MapThemeUpdater() {
  const map = useMap();
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const darkMode = document.documentElement.classList.contains("dark");
      setIsDark(darkMode);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const darkUrl =
      "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    const lightUrl =
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    L.tileLayer(isDark ? darkUrl : lightUrl, {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(map);
  }, [isDark, map]);

  return null;
}

export default function MapView() {
  const { vendors, selectedVendorId } = useVendors();
  const selected = vendors.find((v) => v.id === selectedVendorId);

  return (
    <MapContainer
      center={[35.7, 51.4]}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <MapThemeUpdater />
      {vendors.map((v) => {
        if (!v.location_lat || !v.location_lng) return null;

        const customIcon = v.logo
          ? L.icon({
              iconUrl: v.logo,
              iconSize: [40, 40],
              iconAnchor: [20, 40],
              popupAnchor: [0, -40],
              className: "rounded-full border border-gray-300",
            })
          : L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
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
