import { useEffect, useState, useRef } from "react";
import { MapPin, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { Shelters } from "../../../components/Shelters";
import { ModalEmergency } from "../../../components/Modal";
import { type User } from "../../../assets/types/user.types";
import { api } from "../../../services/api/api";
import HelpRequests from "../../../components/help_requests";
import type { Location } from "@/assets/types/location.types";
import { sheltersMock } from "@/assets/data/shelters.mock";
import type { Map, LayerGroup, Marker } from "leaflet";
import { toast } from "react-toastify";
export default function App() {
    const [location, setLocation] = useState<Location | null>(null);
    const mapRef = useRef<HTMLDivElement | null>(null);
    const leafletMap = useRef<Map | null>(null);
    const markersLayer = useRef<LayerGroup | null>(null);
    const userMarkerRef = useRef<Marker | null>(null);
    const navigate = useNavigate()
    const [user, setUser] = useState<User>()
    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get('/users/me', { withCredentials: true })
                setUser(response.data.user)
            } catch (error) {
                toast.error('Erro na requisição')
                navigate('/')
            }
        }
        getUser()
    }, [])
    useEffect(() => {
        if (!document.getElementById("leaflet-css")) {
            const link = document.createElement("link");
            link.id = "leaflet-css";
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            document.head.appendChild(link);
        }

        const script = document.createElement("script");
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
        script.async = true;
        script.onload = () => {
            if (!leafletMap.current && mapRef.current) {
                const L = window.L;
                leafletMap.current = L.map(mapRef.current).setView(
                    [-8.0476, -34.8770],
                    13
                );

                L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
                    attribution:
                        '&copy; OpenStreetMap contributors &copy; CARTO',
                    subdomains: "abcd",
                    maxZoom: 20,
                }).addTo(leafletMap.current);

                markersLayer.current = L.layerGroup().addTo(leafletMap.current);
                renderMarkers();
            }
        };
        document.head.appendChild(script);
        return () => {
            if (leafletMap.current) {
                leafletMap.current.remove();
                leafletMap.current = null;
            }
        };
    }, []);
    const renderMarkers = () => {
        if (!window.L || !markersLayer.current) return;

        const L = window.L;
        const layer = markersLayer.current;

        layer.clearLayers();

        sheltersMock.forEach((shelter) => {
            const marker = L.marker([shelter.lat, shelter.lng]).addTo(layer);

            marker.bindPopup(`
        <div style="color: #333; font-family: sans-serif;">
          <h3 style="margin: 0 0 5px 0; font-weight: bold;">${shelter.name}</h3>
          <p style="margin: 0; font-size: 12px;">Vagas: ${shelter.spots}</p>
          <p style="margin: 0; font-size: 12px; color: ${shelter.spots > 0 ? 'green' : 'red'}">
            ${shelter.spots > 0 ? 'Disponível' : 'Lotado'}
          </p>
        </div>
      `);
        });
    };
    const handleGetLocation = () => {
        if (!("geolocation" in navigator)) return;
        if (!leafletMap.current || !window.L) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ lat: latitude, lng: longitude });

                const L = window.L;
                const map: any = leafletMap.current;

                map.flyTo([latitude, longitude], 16);

                if (userMarkerRef.current) {
                    map.removeLayer(userMarkerRef.current);
                }

                userMarkerRef.current = L.marker([latitude, longitude])
                    .addTo(map)
                    .bindPopup("Você está aqui")
                    .openPopup();
            },
            (error) => {
                console.error("Erro ao obter localização", error);
            }
        );
    };
    const centerOnShelter = (lat: number, lng: number) => {
        if (leafletMap.current) {
            leafletMap.current.setView([lat, lng], 16);
        }
    };
    return (
        <main className="bg-black text-white font-sans">
            <header className="flex justify-around items-center mb-6 p-4 bg-black border-b border-white/30 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                    <h1 className="text-2xl font-bold tracking-tight">Ajuda<span>PE</span></h1>
                </div>
                <Link className="flex items-center gap-3" to={'/profile'}>
                    <User2 />
                    <span className="line-clamp-1  w-20">{user?.name || "Usuário"}</span>
                </Link>
            </header>
            <section className="max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 m-auto">
                <Shelters centerOnShelter={centerOnShelter} />
                <motion.div
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 0.9, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <div ref={mapRef} className="w-full h-[60vh] z-0" />
                    {location && (
                        <div className="bottom-4 left-4 z-[1000] bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 text-xs">
                            <p className="text-white font-bold">Localização Ativa</p>
                            <p className="text-gray-400">{location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
                        </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-6">
                        <span className="text-lg font-bold">Precisa de ajuda? Clique no botão</span>
                        <ModalEmergency />
                    </div>

                    <button
                        onClick={handleGetLocation}
                        className="absolute top-3  right-3
           bg-white text-black hover:bg-gray-300 active:scale-95 transition-all px-6 py-2.5 rounded-xl backdrop-blur-md font-medium flex items-center gap-2 border border-blue-400/30"
                    >
                        <MapPin size={18} />
                        Usar minha localização
                    </button>
                </motion.div>
                {user?.help_requests && user?.help_requests?.length > 0 && <HelpRequests help_requests={user?.help_requests && user.help_requests} />}
            </section>

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
        }
        .leaflet-container {
          background: #111 !important;
        }
        .leaflet-popup-content-wrapper {
          background: white !important;
          border-radius: 12px !important;
        }
        .leaflet-popup-tip {
          background: white !important;
        }
      `}} />
        </main>
    );
}