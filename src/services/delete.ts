import { toast } from "react-toastify";
import { api } from "./api/api";
import { AxiosError } from "axios";

export async function handleDeleteHelp(id: string) {
    try {
        const { data } = await api.delete(`/help-request/${id}`, {
            withCredentials: true,
        });
        if (data) {
            toast.success(data.message);
        }
    } catch (error) {
        if (error instanceof AxiosError) {
            const mensagem =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Erro ao apagar pedido";

            toast.error(mensagem);
        } else {
            toast.error("Erro inesperado");
        }

        (error);
    }
}