export interface User {
    id: string,
    name: string,
    phone: number | string
    role: "user" | "voluntary" | "admin_shelter"
    help_requests: Help_Requests[]
    email: string   
}
export enum Urgency {
    Baixa = "low",
    Media = "medium",
    Alta = "high"
}
export enum StatusRequest {
    Pendente = "pending",
    Resolvido = "resolved",
    Cancelado = "cancelled"
}
export interface Help_Requests {
    id: string,
    user_id: string
    latitude: number
    longitude: number
    message?: string
    urgency: Urgency
    status: StatusRequest
    created_at: Date
}