import { toast } from "react-toastify";
export function useLocation() {
    function getLocation({ setLocation }:
        {
            setLocation: React.Dispatch<React.SetStateAction<{ lat: number, long: number }>>
        }) {
        if (!navigator.geolocation) return toast.error('Geolocalização não suportada')
        navigator.geolocation.getCurrentPosition((position) => {
            setLocation({
                lat: position.coords.latitude,
                long: position.coords.longitude
            })
        }, (err) => {
            toast.error('Erro ao pegar localização')
            console.log(err.message)
        })
    }

    return { getLocation }
}