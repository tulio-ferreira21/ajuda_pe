import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "../components/ui/dialog"

import { Button } from "../components/ui/button"
import { AlertTriangle, Trash } from "lucide-react"
import { Link } from "react-router-dom"

export function ModalEmergency() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button
                    className="bg-red-600 text-white hover:bg-red-700 active:scale-95 transition-all px-6 py-2.5 rounded-xl backdrop-blur-md font-medium flex items-center justify-center gap-2 border border-red-950/30">
                    <AlertTriangle size={18} />
                    Emergência
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-zinc-950 border border-white/30 p-6 text-white">
                <DialogHeader>
                    <DialogTitle>Emergência</DialogTitle>
                    <DialogDescription>
                        Você realmente deseja acionar o alerta?
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    Você será redirecionado para uma página de formulação de emergência. Deseja continuar?
                </div>

                <DialogFooter className="bg-zinc-950 text-white">
                    <DialogClose asChild>
                        <Button variant="default">Cancelar</Button>
                    </DialogClose>

                    <Link to={'/emergency'}>
                        <Button variant="destructive" className="w-full">
                            Confirmar
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function ModalConfirm({
    description,
    children,
    onSubmit
}: {
    description: string,
    children: React.ReactNode,
    onSubmit: () => Promise<void>
}) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="destructive"
                    className="w-full   ">
                    <AlertTriangle size={18} />
                    Cancelar Pedido
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md bg-zinc-950 border border-white/30 p-6 text-white" style={{ zIndex: 1000 }}>
                <DialogHeader>
                    <DialogTitle>Deseja Continuar?</DialogTitle>
                    <DialogDescription>
                        {description}
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    {children}
                </div>

                <DialogFooter className="bg-zinc-950 text-white">
                    <DialogClose asChild>
                        <Button variant="default">Cancelar</Button>
                    </DialogClose>

                    <Link to={'/dashboard'}>
                        <Button onClick={onSubmit} variant="destructive" className="w-full">
                            Confirmar
                        </Button>
                    </Link>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function ModalConfirmDelete({ handleDelete, id }: { handleDelete: (id: string) => Promise<void>, id: string }) {
    return (
        <Dialog>
            <DialogTrigger onClick={(e) => e.stopPropagation()}  className="bg-red-800/40 p-2 rounded-lg hover:bg-red-900/40">
                    <Trash size={18} />
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 text-white border border-zinc-900">
                <DialogHeader>
                    <DialogTitle>Deseja continuar?</DialogTitle>
                    <DialogDescription>
                        Deseja apagar esse pedido de ajuda do histórico? Essa ação é inversível
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="bg-black">
                    <DialogClose asChild>
                        <Button variant="ghost">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button className="flex items-center gap-3" variant="destructive" onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        handleDelete(id)
                        window.location.href="/dashboard"
                    }}>
                        <Trash />
                        Continuar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}