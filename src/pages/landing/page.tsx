import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Typewriter } from 'react-simple-typewriter'
export default function Main() {
    const heroBg: React.CSSProperties = {
        backgroundImage: `
            linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.9)),
            url('/img-hero.jpeg')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed"
    }
    return (
        <main className="min-h-dvh">
            <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-[2px]">
                <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4 text-white">

                    <div className="font-bold tracking-wide text-lg">
                        AjudaPE
                    </div>

                    <nav className="hidden md:flex gap-6 text-sm text-white/80">
                        <a href="#hero" className="hover:text-white transition">Início</a>
                        <a href="#mapa" className="hover:text-white transition">Abrigos</a>
                        <a href="#doacoes" className="hover:text-white transition">Doações</a>
                    </nav>

                    <Link to="/auth" className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 active:scale-95 transition">
                        Entrar
                    </Link>

                </div>
            </header>

            <section
                id="hero"
                className="relative min-h-dvh flex items-center justify-center text-white px-6 pt-24"
                style={heroBg}
            >
                <div className="max-w-6xl text-center space-y-6">

                    <motion.h1
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-4xl md:text-7xl font-bold tracking-tight font-ibm-sans"
                    >
                        <Typewriter
                            words={[
                                "Encontre abrigos próximos em segundos",
                                "Conectando voluntários e abrigos",
                                "Ajuda em tempo real em emergências"
                            ]}
                            loop={true}
                            cursor
                            cursorStyle="|"
                            typeSpeed={50}
                            deleteSpeed={50}
                            delaySpeed={3000}
                        />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="text-white/80 text-lg md:text-2xl"
                    >
                        Plataforma de emergência para localizar abrigos, receber alertas e ajudar pessoas em risco.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="flex gap-4 justify-center pt-4"
                    >
                        <Link to="/auth">
                            <button className="bg-white text-black px-6 py-3 rounded-xl font-medium hover:scale-105 active:scale-95 transition">
                                Encontrar abrigo
                            </button>
                        </Link>
                        <a rel="noopener" target="_blank" href="https://www.defesacivil.pe.gov.br/manual-de-gestao-de-abrigos" className="border border-white/30 px-6 py-3 rounded-xl hover:bg-white/10 hover:scale-105 active:scale-95 transition">
                            Saber mais
                        </a>
                    </motion.div>

                </div>
            </section>

            {/**
          *    <section className="min-h-dvh text-white px-6 py-20 bg-black backdrop-blur-2xl">
                <div className="max-w-6xl mx-auto text-center space-y-12">

                    <h2 className="text-3xl md:text-5xl font-bold">
                        Como funciona
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 text-left">

                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-semibold mb-2">Encontre abrigos</h3>
                            <p className="text-white/70">Veja os abrigos disponíveis mais próximos da sua localização.</p>
                        </div>

                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-semibold mb-2">Solicite ajuda</h3>
                            <p className="text-white/70">Envie pedidos de socorro em situações de emergência.</p>
                        </div>

                        <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                            <h3 className="text-xl font-semibold mb-2"> Apoie abrigos</h3>
                            <p className="text-white/70">Faça doações ou torne-se voluntário rapidamente.</p>
                        </div>

                    </div>
                </div>
            </section>  
          */}
        </main>
    )
}