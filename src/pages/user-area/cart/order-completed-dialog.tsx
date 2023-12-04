import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button,
} from "@/components";
import { Link } from "react-router-dom";

interface OrderCompletedDialogProps {
  open: boolean;
  setOpen(value: boolean): void;
  lastOrderCreatedId: number;
}

export function OrderCompletedDialog({
  open,
  setOpen,
  lastOrderCreatedId,
}: OrderCompletedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido Concluído</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-col gap-1">
          <p className="text-sm">Seu pedido foi enviado!</p>
          <p className="text-sm">Aguarde a nossa confirmação e contato.</p>
          <p className="text-sm">Nº do Pedido: #{lastOrderCreatedId}</p>
        </div>
        <Link to="/user-area/my-orders">
          <Button className="w-full">Ir para Meus Pedidos</Button>
        </Link>
      </DialogContent>
    </Dialog>
  );
}
