import { ExternalLink, Globe, Info, Mail, Phone, ShieldCheck } from "lucide-react";
import { Outlet } from "react-router-dom";

export default function Layout() {
    const date = new Date()
    return (
        <main className="min-h-dvh flex flex-col font-ibm-sans bg-black">
            <section className="flex-1">
                <Outlet />
            </section>
            <footer className="mt-auto bg-black/40 backdrop-blur-md border-t border-white/10 p-8 lg:p-12">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold tracking-tight text-white">
                                Ajuda<span className="text-white">PE</span>
                            </h2>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Plataforma colaborativa para gestão de abrigos e auxílio em situações de desastres naturais no estado de Pernambuco.
                        </p>
                        <div className="mt-2 p-3     inline-flex items-center gap-3 w-fit">
                            <img
                                src="/pe-gov.png"
                                className="w-40 h-auto rounded shadow-sm"
                                alt="Bandeira PE"
                            />
                            <span className="text-xs font-semibold text-gray-300">Governo de Pernambuco</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Emergência</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="tel:193" className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                                    <div>
                                        <img
                                            src="/bombeiro-pe.png"
                                            alt=""
                                            width={40}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Bombeiros</p>
                                        <p className="font-mono font-bold">193</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="tel:199" className="group flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                                    <div>
                                        <img
                                            src="/defesa-pe.png"
                                            alt=""
                                            width={40}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500">Defesa Civil</p>
                                        <p className="font-mono font-bold">199</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-white">Links Úteis</h3>
                        <div className="grid grid-cols-1 gap-2">
                            <a href="https://transparencia.pe.gov.br/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors group">
                                <Globe size={14} /> Portal da Transparência <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors group">
                                <Mail size={14} /> Fale Conosco <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white flex items-center gap-2 text-sm transition-colors group">
                                <Info size={14} /> Como Ajudar <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs text-center md:text-left leading-relaxed">
                        &copy; {date.getFullYear()} AjudaPE. Desenvolvido para auxílio humanitário. <br className="md:hidden" /> Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="text-[10px] text-gray-700 font-mono tracking-tighter">v1.0.0-STABLE</span>
                        <div className="flex gap-4">
                            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest">Sistemas Online</span>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    )
}