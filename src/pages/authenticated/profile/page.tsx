import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    User2,
    Mail,
    Phone,
    ArrowLeft,
    ShieldCheck,
    Pencil,
    Save,
    X,
} from "lucide-react";
import type { User } from "../../../assets/types/user.types";
import { api } from "../../../services/api/api";
import { toast } from "react-toastify";

export default function Profile() {
    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    const [formData, setFormData] = useState<{ name: string, phone: string | number, email: string }>({
        name: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get("/users/me", { withCredentials: true });
                setUser(response.data.user);
                setFormData({
                    name: response.data.user?.name || "",
                    phone: response.data.user?.phone || "",
                    email: response.data.user?.email || "",
                });
            } catch (error: any) {
                (error);
                (error?.message);
            } finally {
                setLoading(false);
            }
        }

        getUser();
    }, []);

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }
    async function handleSaveProfile() {
        if (String(formData.phone).length != 11) return toast.error('O número deve ter 11 caracteres')
        try {
            const response = await api.patch('/users', { name: formData.name, email: formData.email, phone: formData.phone })
            setUser(response.data.user)
            toast.success('Usuário atualizado com sucesso')
            setIsEditing(false)
        } catch (error) {
            (error);
        }
    }
    function handleCancelEdit() {
        setFormData({
            name: user?.name || "",
            phone: user?.phone || "",
            email: user?.email || "",
        });
        setIsEditing(false);
    }
    return (
        <main className="min-h-screen bg-black text-white font-sans">
            <header className="flex justify-between items-center p-4 border-b border-white/10 bg-black/90 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                    <Link
                        to="/dashboard"
                        className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition"
                    >
                        <ArrowLeft size={18} />
                        Voltar
                    </Link>
                </div>

                <h1 className="text-2xl font-bold tracking-tight">
                    Ajuda<span>PE</span>
                </h1>

                <Link
                    className="flex items-center gap-2 text-white/80 hover:text-white transition"
                    to="/profile"
                >
                    <User2 size={18} />
                    Perfil
                </Link>
            </header>

            <section className="max-w-5xl mx-auto px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                >
                    <div className="lg:col-span-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center text-3xl font-bold shadow-lg">
                                {user?.name ? user.name.slice(0, 1).toUpperCase() : <User2 size={34} />}
                            </div>

                            <h2 className="mt-4 text-2xl font-bold">
                                {loading ? "Carregando..." : user?.name || "Usuário"}
                            </h2>

                            <p className="text-sm text-gray-400 mt-1">
                                {user?.email || "Sem email cadastrado"}
                            </p>

                            <div className="mt-6 w-full rounded-xl border border-white/10 bg-black/40 p-4">
                                <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                    Status da conta
                                </p>
                                <div className="flex items-center justify-center gap-2 text-sm font-medium text-green-400">
                                    <ShieldCheck size={16} />
                                    Conta ativa
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditing((prev) => !prev)}
                                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-3 font-medium hover:bg-gray-200 transition"
                            >
                                <Pencil size={16} />
                                Editar perfil
                            </button>
                        </div>
                    </div>
                    <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold">Informações do perfil</h3>

                            {isEditing && (
                                <button
                                    onClick={handleCancelEdit}
                                    className="flex items-center gap-2 text-sm text-white/70 hover:text-white transition"
                                >
                                    <X size={16} />
                                    Cancelar
                                </button>
                            )}
                        </div>
                        {loading ? (
                            <div className="space-y-4">
                                <div className="h-16 rounded-xl bg-white/5 animate-pulse" />
                                <div className="h-16 rounded-xl bg-white/5 animate-pulse" />
                                <div className="h-16 rounded-xl bg-white/5 animate-pulse" />
                            </div>
                        ) : isEditing ? (
                            <div className="grid gap-4">
                                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                        Nome
                                    </p>
                                    <input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                                        placeholder="Digite seu nome"
                                    />
                                </div>  
                                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                        Telefone
                                    </p>
                                    <input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                                        placeholder="Digite seu telefone"
                                    />
                                </div>

                                <div className="rounded-xl border border-white/10 bg-black/40 p-4">
                                    <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">
                                        Email
                                    </p>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-transparent outline-none text-white placeholder:text-gray-500"
                                        placeholder="Digite seu email"
                                    />
                                </div>

                                <button
                                    onClick={handleSaveProfile}
                                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-white text-black px-4 py-3 font-medium hover:bg-gray-200 transition"
                                >
                                    <Save size={16} />
                                    Salvar alterações
                                </button>
                            </div>
                        ) : (
                            <div className="grid gap-4">
                                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-4">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                                        <User2 size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500">Nome</p>
                                        <p className="text-white font-medium">{user?.name || "Não informado"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-4">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Phone size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500">Telefone</p>
                                        <p className="text-white font-medium">{user?.phone || "Não informado"}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-4">
                                    <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center">
                                        <Mail size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest text-gray-500">Email</p>
                                        <p className="text-white font-medium">{user?.email || "Não informado"}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </section>
        </main>
    );
}