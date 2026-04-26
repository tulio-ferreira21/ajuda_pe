import { MapPin, Users } from "lucide-react";
import { motion } from 'framer-motion'
const sheltersMock = [
    {
        id: 1,
        name: "Escola Municipal X",
        lat: -8.0577,
        lng: -34.8829,
        distance: "1.2 km",
        spots: 20,
        needs: [
            { item: "Água", priority: "HIGH" },
            { item: "Comida", priority: "MEDIUM" }
        ],
        updated: "10 min atrás"
    },
    {
        id: 2,
        name: "Ginásio Central",
        lat: -8.0631,
        lng: -34.8711,
        distance: "2.5 km",
        spots: 0,
        needs: [{ item: "Cobertores", priority: "HIGH" }],
        updated: "5 min atrás"
    },
    {
        id: 1,
        name: "Escola Municipal X",
        lat: -8.0577,
        lng: -34.8829,
        distance: "1.2 km",
        spots: 20,
        needs: [
            { item: "Água", priority: "HIGH" },
            { item: "Comida", priority: "MEDIUM" }
        ],
        updated: "10 min atrás"
    },
    {
        id: 2,
        name: "Ginásio Central",
        lat: -8.0631,
        lng: -34.8711,
        distance: "2.5 km",
        spots: 0,
        needs: [{ item: "Cobertores", priority: "HIGH" }],
        updated: "5 min atrás"
    },
    {
        id: 1,
        name: "Escola Municipal X",
        lat: -8.0577,
        lng: -34.8829,
        distance: "1.2 km",
        spots: 20,
        needs: [
            { item: "Água", priority: "HIGH" },
            { item: "Comida", priority: "MEDIUM" }
        ],
        updated: "10 min atrás"
    },
    {
        id: 2,
        name: "Ginásio Central",
        lat: -8.0631,
        lng: -34.8711,
        distance: "2.5 km",
        spots: 0,
        needs: [{ item: "Cobertores", priority: "HIGH" }],
        updated: "5 min atrás"
    },
    {
        id: 1,
        name: "Escola Municipal X",
        lat: -8.0577,
        lng: -34.8829,
        distance: "1.2 km",
        spots: 20,
        needs: [
            { item: "Água", priority: "HIGH" },
            { item: "Comida", priority: "MEDIUM" }
        ],
        updated: "10 min atrás"
    },
    {
        id: 2,
        name: "Ginásio Central",
        lat: -8.0631,
        lng: -34.8711,
        distance: "2.5 km",
        spots: 0,
        needs: [{ item: "Cobertores", priority: "HIGH" }],
        updated: "5 min atrás"
    },

];

export function Shelters({ centerOnShelter }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-full">
            <h3 className="w-full p-4 text-2xl font-bold border-b border-white">Abrigos Próximos</h3>
            <div className="relative overflow-y-auto h-[60vh] p-4 bg-black/80 custom-scrollbar">
                <div className="grid gap-6">
                    {sheltersMock.map((shelter,index) => (
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: .6, ease: "easeOut" }}
                            key={index}
                            onClick={() => centerOnShelter(shelter.lat, shelter.lng)}
                            className="p-5 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:border-white transition-all cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <h2 className="text-lg font-bold transition-colors">
                                    {shelter.name}
                                </h2>
                                <span className="text-xs bg-white/5 px-2 py-1 rounded-md text-gray-400">
                                    {shelter.updated}
                                </span>
                            </div>

                            <div className="flex items-center text-gray-400 mb-4 text-sm">
                                <MapPin size={14} className="mr-1 text-white" />
                                {shelter.distance}
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between bg-black/20 p-3 rounded-xl">
                                    <div className="flex items-center">
                                        <Users size={18} className="mr-2 text-gray-300" />
                                        <span className="text-sm font-medium">Capacidade</span>
                                    </div>
                                    <span className={`text-sm font-bold ${shelter.spots > 0 ? "text-green-400" : "text-red-800"}`}>
                                        {shelter.spots > 0 ? `${shelter.spots} vagas` : "Lotado"}
                                    </span>
                                </div>

                                <div className="bg-black/20 p-3 rounded-xl">
                                    <p className="text-sm font-medium flex items-center mb-2 text-gray-300">
                                        Necessidades Urgentes:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {shelter.needs.map((need, index) => (
                                            <span
                                                key={index}
                                                className={`text-[10px] px-2 py-1 rounded-full uppercase font-bold border ${need.priority === "HIGH"
                                                    ? "bg-red-950 text-red-400 border-red-500/30"
                                                    : "bg-yellow-800 text-yellow-300 border-yellow-500/30"
                                                    }`}
                                            >
                                                {need.item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent z-10" />
        </motion.div>
    )
}