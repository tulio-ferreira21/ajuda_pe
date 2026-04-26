import { Link } from "react-router-dom";
import type { Help_Requests } from "../assets/types/user.types";
import { motion } from 'framer-motion'
{/**
    import { Trash } from "lucide-react";
import { Button } from "./ui/button";
 */}
import { handleDeleteHelp } from "../services/delete";
import { ModalConfirmDelete } from "./Modal";
export default function HelpRequests({ help_requests }: { help_requests: Help_Requests[] }) {
    const status = {
        pending: { title: "Pendente", style: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
        resolved: { title: "Resgate concluído", style: 'bg-green-500/20 text-green-400 border-green-500/30' },
        cancelled: { title: "Cancelado", style: 'bg-red-500/20 text-red-400 border-red-500/30' }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative h-full">
            <h3 className="w-full p-5    text-2xl font-bold border-b border-white font-ibm-sans">Pedidos de socorro</h3>
            <div className="relative overflow-y-auto max-h-[60vh] p-4 bg-black/80 custom-scrollbar">
                <div className="grid gap-6">
                    {help_requests.map((help, index) => (
                        <div
                            key={help.id}
                            className="relative bg-zinc-950 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-200 shadow-sm hover:shadow-md"
                        >
                            {help?.status !== "pending" && (
                                <div className="absolute top-3 right-3 z-20">
                                    <ModalConfirmDelete
                                        handleDelete={handleDeleteHelp}
                                        id={help.id}
                                    />
                                </div>
                            )}

                            <Link to={`/help/${help.id}`} className="block">
                                <div className="text-white flex flex-col gap-4 p-5">

                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold tracking-tight">
                                            Pedido #{index + 1}
                                        </h3>
                                    </div>

                                    <span
                                        className={`
            w-fit px-3 py-1.5 rounded-full text-xs font-medium border
            ${status[help.status]?.style}
          `}
                                    >
                                        {status[help.status]?.title}
                                    </span>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between text-xs text-zinc-500">
                                        <span>ID:</span>
                                        <span className="font-mono text-zinc-400">
                                            {help.id}
                                        </span>
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent z-10" />
        </motion.div>
    )
}