import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Select,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectValue,
  Button,
} from "@/components";
import { OrderResponse, OrderStatus } from "@/services";
import { useState } from "react";

interface OrderChangeStatusDialogProps {
  open: boolean;
  setOpen(value: boolean): void;
  order: OrderResponse;
  handleChangeStatusOrder(id: number, type: OrderStatus): void;
}

export function OrderChangeStatusDialog({
  open,
  setOpen,
  order,
  handleChangeStatusOrder,
}: OrderChangeStatusDialogProps) {
  const [newStatus, setNewStatus] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterando status do pedido #{order.id}</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-col gap-4">
          <div className="flex w-full flex-col gap-1">
            <p className="text-sm">
              <strong className="font-semibold">Status atual</strong>:{" "}
              {order.status}
            </p>
          </div>

          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Aguardando Confirmação">
                Aguardando Confirmação
              </SelectItem>
              <SelectItem value="Em Preparo">Em Preparo</SelectItem>
              <SelectItem value="Concluído">Concluído</SelectItem>
              <SelectItem value="Rejeitado">Rejeitado</SelectItem>
            </SelectContent>
          </Select>

          <Button
            onClick={() => {
              handleChangeStatusOrder(order.id, newStatus as OrderStatus)
              setOpen(false)
            }}
          >
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
