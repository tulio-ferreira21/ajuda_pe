import { Link, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { api } from "../../services/api/api"
import { toast } from "react-toastify"
import useAuth from "@/context/useAuth"

export default function Auth() {
    const { login } = useAuth()
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ phone: number }>({ mode: "onChange" })
    const navigate = useNavigate()
    async function onSubmit(data: { phone: number }) {
        try {
            const response: { message: string, phone: number } = await api.post('/auth/send-code', { phone: data.phone })
            toast.success(response.message || "Código enviado", { toastId: "success-message" })
            login(data.phone)
            navigate('verify-code')
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Erro na requisição")
        }
    }
    return (
        <main className="min-h-dvh flex items-center justify-center bg-black px-4">
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                initial={{ x: 50, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{ duration: .4, ease: "easeOut" }}
                className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Entrar
                    </h1>
                    <p className="text-white/60 text-sm">
                        Acesse sua conta para continuar
                    </p>
                </div>
                <div className="space-y-2">
                    <Label className="text-white/70 text-sm">
                        Número de telefone
                    </Label>

                    <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="ex: 81999999999"
                        {...register('phone', { required: true, minLength: 11, maxLength: 11, pattern: { value: /^[0-9]+$/, message: "Informe um número válido" } })}
                        className="bg-black/50 border-white/10 focus:border-white/30 focus:ring-0 
                        "
                        onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
                        }}
                    />
                    {errors.phone?.type === 'minLength' || errors.phone?.type === 'maxLength' && <p className="text-sm text-red-500">O telefone dever ter 11 dígitos</p>}
                </div>
                <div className="flex justify-start">
                    <Link
                        to="/"
                        className="text-sm text-white/50 hover:text-white transition"
                    >
                        Não consigo acessar meu número
                    </Link>
                </div>
                <Button
                    disabled={!isValid}
                    className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition disabled:bg-gray-800">
                    Continuar
                </Button>

                <p className="text-center text-xs text-white/40">
                    Você receberá um código por SMS para confirmar seu acesso
                </p>

            </motion.form>
        </main>
    )
}