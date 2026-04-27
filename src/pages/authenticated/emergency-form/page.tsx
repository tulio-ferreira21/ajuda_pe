import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../../services/api/api";
import { type Help_Requests } from "../../../assets/types/user.types";
import { toast } from "react-toastify";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { ArrowLeft } from "lucide-react";
import { motion } from 'framer-motion'
import { ModalConfirm } from "../../../components/Modal";
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

export default function PageRequest() {
    const { id } = useParams()
    const [request, setRequest] = useState<Help_Requests | null>(null)

    const status = {
        pending: { title: "Pendente", style: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
        resolved: { title: "Resgate concluído", style: 'bg-green-500/20 text-green-400 border-green-500/30' },
        cancelled: { title: "Cancelado", style: 'bg-red-500/20 text-red-400 border-red-500/30' }
    }
    async function cancelledStatus() {
        try {
            const response = await api.patch(`/help-request/${id}`, { status: 'cancelled' })
            setRequest((prev) => {
                // Aqui vai dar erro porquê como deifni que request receberia HelpRequest ou null, apenas ...prev pode quebrar, caso seja null
                // Então faça uma checagem no valor de prev para ver se ela é null ou não
                if(!prev) return prev
                return {
                    ...prev, status: response.data.status
                }
            })
            toast.success('Status Atualizado com sucesso')
        } catch (error) {
            toast.error('Erro ao atualizar')
        }
    }
    useEffect(() => {
        async function getHelpRequest() {
            try {
                const json = await api.get(`help-request/${id}`, { withCredentials: true })
                setRequest(json.data)
            } catch (error: any) {
                toast.error(error.message || "Erro na requisição")
            }
        }
        getHelpRequest()
    }, [id])

    if (!request) {
        return (
            <main className="flex items-center justify-center min-h-dvh text-white">
                <span className="animate-pulse text-lg text-gray-400">
                    Carregando pedido...
                </span>
            </main>
        )
    }
    return (
        <main className="flex flex-col gap-10 items-center justify-center p-6 text-white bg-black min-h-dvh">
            <header className="flex justify-between items-center p-4 border-b border-white/10 bg-black/90 backdrop-blur-xl w-full">
                <div className="flex items-center gap-3">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
                    >
                        <ArrowLeft size={18} />
                        Voltar
                    </Link>
                </div>
            </header>
            <motion.section
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: .6 }}
                className="w-full max-w-xl bg-zinc-950 rounded-2xl shadow-xl border flex flex-col gap- border-white/10 p-6 space-y-6">
                <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">
                        Pedido de socorro
                    </h3>
                    <p className="text-sm text-gray-400 break-all">
                        ID: {request.id}
                    </p>
                </div>
                <div className="space-y-2 flex flex-col">
                    <span className="text-sm text-gray-400 uppercase tracking-wide">
                        Status:
                    </span>

                    <span className={`
                        inline-block px-4 py-2 rounded-xl text-sm font-semibold border
                        ${status[request.status]?.style}
                    `}>
                        {status[request.status]?.title}
                    </span>
                </div>
                <div className="space-y-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wide">
                        Mensagem
                    </span>

                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-4 text-gray-200 leading-relaxed">
                        {request.message || "Nenhuma mensagem enviada."}
                    </div>
                </div>
                <div className="space-y-2">
                    <span className="text-sm text-gray-400 uppercase tracking-wide">
                        Localização
                    </span>
                    <div className="h-[300px] w-full rounded-xl overflow-hidden border border-white/10">
                        <MapContainer
                            center={[request?.latitude, request?.longitude]}
                            zoom={15}
                            scrollWheelZoom={false}
                            className="h-full w-full"
                        >
                            <TileLayer
                                attribution="&copy; OpenStreetMap contributors"
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={[request.latitude, request.longitude]}>
                                <Popup>
                                    Pedido de socorro
                                </Popup>
                            </Marker>
                        </MapContainer>
                    </div>
                    {request.status != 'cancelled' && <ModalConfirm onSubmit={cancelledStatus} description="Você apagará">
                        Deseja cancelar o pedido
                    </ModalConfirm> }
                    <div className="flex flex-col justify-end text-sm text-gray-400 md:flex-row">
                        Pedido efetuado em: <span> {String(request?.created_at)}</span>
                    </div>
                </div>

            </motion.section>
        </main>
    )
}