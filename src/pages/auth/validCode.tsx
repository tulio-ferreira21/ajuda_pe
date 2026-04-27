import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { api } from "../../services/api/api"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import useAuth from "@/context/useAuth"
export default function VerifyCode() {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ code: number }>({ mode: "onChange" })
    const navigate = useNavigate()
    const { user } = useAuth()
    async function verifyCode(data: { code: number }) {
        try {
            const result: { message: string } = await api.post('/auth/verify-code', { phone: user, code: data.code })
            toast.success(result.message || "Código validado com sucesso")
            navigate('/dashboard')
        } catch (error) {
            toast.error('Código inválido')
        }
    }
    return (
        <main className="min-h-dvh flex items-center justify-center bg-black px-4">
            <motion.form
                onSubmit={handleSubmit(verifyCode)}
                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: .4, ease: "easeOut" }}
                className="w-full max-w-md bg-zinc-950 border border-white/10 rounded-2xl p-6 md:p-8 text-white shadow-xl space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Verifique o código
                    </h1>
                    <p className="text-white/60 text-sm">
                        Verifique o código enviado para o seu número via SMS
                    </p>
                </div>
                <div className="space-y-2">
                    <Label className="text-white/70 text-sm">
                        Código de 6 dígitos
                    </Label>

                    <Input
                        type="number"
                        inputMode="numeric"
                        placeholder="Verifique sua caixa postal"
                        {...register('code', { required: true, minLength: 6, maxLength: 6, pattern: { value: /^[0-9]+$/, message: "Informe um número válido" } })}
                        className="bg-black/50 border-white/10 focus:border-white/30 focus:ring-0 
                        "
                        onInput={(e) => {
                            e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")
                        }}
                    />

                    {errors.code?.type === 'minLength' || errors.code?.type === 'maxLength' && <p className="text-sm text-red-500">O código deve ter 6 dígitos</p>}
                </div>

                <Button
                    disabled={!isValid}
                    className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition disabled:bg-gray-800">
                    Verificar Código
                </Button>

                <p className="text-center text-xs text-white/40">
                    Você receberá um código por SMS para confirmar seu acesso
                </p>

            </motion.form>
        </main>
    )
}