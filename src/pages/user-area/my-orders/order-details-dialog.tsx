import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components";
import { OrderResponse } from "@/services";
import { formatMoneyBRL } from "@/utils";

interface OrderDetailsDialogProps {
  open: boolean;
  setOpen(value: boolean): void;
  order: OrderResponse;
}

export function OrderDetailsDialog({
  open,
  setOpen,
  order,
}: OrderDetailsDialogProps) {
  const totalOrder = order.OrderItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pedido #{order.id}</DialogTitle>
        </DialogHeader>

        <div className="flex w-full flex-col gap-1">
          <p className="text-sm">
            <strong className="font-semibold">Endereço</strong>:{" "}
            {order.address.street}, {order.address.number} -{" "}
            {order.address.neighborhood} - {order.address.city} -{" "}
            {order.address.state} - {order.address.zipcode}
          </p>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Item</TableHead>
              <TableHead className="w-[50px]">Qtde.</TableHead>
              <TableHead className="w-[150px] text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.OrderItems.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">
                  {order.description}
                </TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell className="text-right">
                  {formatMoneyBRL(Number(order.price))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell className="text-right">
                {formatMoneyBRL(Number(totalOrder))}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>

        <div className="flex w-full flex-col gap-1">
          <p className="text-sm">
            <strong className="font-semibold">Status</strong>: {order.status}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
