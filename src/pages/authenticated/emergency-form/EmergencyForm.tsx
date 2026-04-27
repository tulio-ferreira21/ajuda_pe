import { useForm } from "react-hook-form";
import { Urgency, type Help_Requests } from "../../../assets/types/user.types";
import { api } from "../../../services/api/api";
import { toast } from "react-toastify";
import { Button } from "../../../components/ui/button";
import { motion } from 'framer-motion'
import { TriangleAlert } from "lucide-react";
import { Textarea } from "../../../components/ui/textarea";
import { Link, useNavigate } from "react-router-dom";
export default function EmergencyForm() {
    //control é para elementos shadcn
    const { register, handleSubmit, formState: { isSubmitting } } = useForm<Help_Requests>({ mode: "onChange" })
    const navigate = useNavigate()
    function getLocation(): Promise<GeolocationPosition> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject)
        })
    }
    async function handleEmergency(data: Partial<Help_Requests>) {
        if (!navigator.geolocation) return toast.error('Geolocalização não suportada')
        const position = await getLocation()
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        //    navigator.geolocation.getCurrentPosition(
        //         (position) => {
        //            setLocation({
        //                lat: position.coords.latitude,
        //              lng: position.coords.longitude
        //          })
        //         (position.coords.latitude, position.coords.longitude)
        //    }, (err) => {
        //  toast.error('Erro ao obter a localização')
        //        (err.message)
        //   }
        // )
        try {
            const response = await api.post('/help-request', {
                message: data.message || "Preciso de ajuda",
                latitude: lat,
                longitude: lng,
                urgency: data.urgency
            })
            toast.success(response.data.message || "Mensagem enviado com sucesso")
            navigate(`/help/${response.data.id}`)
        } catch (error) {
            toast.error('Erro na requisição')
        }
    }
    return (
        <main className="flex flex-col min-h-dvh items-center justify-center bg-black">
            <motion.form
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: .6 }}
                onSubmit={handleSubmit(handleEmergency)} className="max-w-2xl w-full p-6 border bg-zinc-950 border-gray-950 rounded-xl flex flex-col gap-6 text-white">
                <h3 className="text-2xl font-bold text-white flex flex-col justify-center items-center gap-4">
                    <TriangleAlert size={32} />
                    Mensagem de Emergência
                </h3>
                <p className="text-gray-500 text-center text-sm">Só chame ajuda se você realmente precisar. Falsa chamada ou requisição a autoridades configura crime </p>
                <div className="flex flex-col gap-3">
                    <label className="text-white/70 text-sm">
                        Mensagem
                    </label>
                    <Textarea
                        {...register('message')}
                        placeholder="Preciso de ajuda..."
                        className="bg-black/50 border-white/10 focus:border-white/30 focus:ring-0 "
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-white/70 text-sm">
                        Nível de Urgência
                    </label>
                    <select {...register('urgency')} className="bg-black/50 border-white/10 p-1 rounded-lg focus:border-white/30 focus:ring-0 text-white">
                        <option value={Urgency.Alta}>Alta</option>
                        <option value={Urgency.Media}>Média</option>
                        <option value={Urgency.Baixa}>Baixa</option>
                    </select>
                </div>
                <Button
                    disabled={isSubmitting}
                    className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition disabled:bg-gray-800">
                    {isSubmitting ? 'Enviando pedido de ajuda' : 'Continuar'}
                </Button>
                <Link className="text-sm text-center hover:underline" to={'/dashboard'}>
                    Voltar ao Dashboard
                </Link>
            </motion.form>
        </main>
    )
}