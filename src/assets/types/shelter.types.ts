export enum StatusShelter {
    inactive = "Inativo",
    open = "Aberto",
    full = "Lotado",
    closed = "Fechado"
}
export enum ServiceTypes {
    Food = "Comida",
    Medical = "Remédios",
    Sleep = "Abrigo"
}
export interface Shelter {
    id: string,
    name: string,
    address: string,
    cep: string | number,
    latitude: number,
    longitude: number,
    total_capacity: number,
    current_capacity: number,
    status: StatusShelter
    contact_phone: number,
    created_by: string,
    last_updated: Date
    created_at: Date
    // Serviços oferecidos
    services: Service[]
}
export interface Donations {
    id: string
    type: "item" | "money"
    amount?: number
    item_name?: string
    id_user: string,
    id_shelter: string,
    created_at: Date
}
export interface Service {
    id: string,
    type: ServiceTypes
}