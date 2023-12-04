/* eslint-disable react-refresh/only-export-components */
import { ButtonIcon, StatusView } from "@/components";
import { OrderStatus } from "@/services";
import { formatMoneyBRL } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

export type OrdersColumns = {
  id: number;
  customer: string;
  phone: string;
  total: string;
  status: OrderStatus;
};

const OrdersStatusText: Record<OrdersColumns["status"], React.ReactNode> = {
  "Aguardando Confirmação": (
    <StatusView title="Aguardando Confirmação" type="warning" />
  ),
  "Em Preparo": <StatusView title="Em Preparo" type="error" />,
  Concluído: <StatusView title="Concluído" type="success" />,
  Rejeitado: <StatusView title="Rejeitado" type="error" />,
};

interface ColumnsProps {
  handleDialogOrderDetails(id: number): void;
  handleChangeStatusOrder(id: number, type: OrderStatus): void;
  handleOrderDialogChangeStatus(id: number): void;
}

export const columns = ({
  handleDialogOrderDetails,
  handleChangeStatusOrder,
  handleOrderDialogChangeStatus,
}: ColumnsProps): ColumnDef<OrdersColumns>[] => [
  {
    accessorKey: "id",
    header: "Código",
  },
  {
    accessorKey: "customer",
    header: "Cliente",
  },
  {
    accessorKey: "phone",
    header: "Telefone",
  },
  {
    accessorKey: "total",
    header: "Valor Total",
    cell: ({ getValue }) => formatMoneyBRL(getValue() as number),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => OrdersStatusText[row.original.status],
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const id = Number(row.original.id);
      const status = row.original.status;

      return (
        <div className="flex gap-1">
          <ButtonIcon
            description="Detalhes"
            icon="Eye"
            onClick={() => handleDialogOrderDetails(id)}
          />

          {status === "Em Preparo" && (
            <ButtonIcon
              description="Concluir pedido"
              icon="Check"
              onClick={() => handleChangeStatusOrder(id, "Concluído")}
            />
          )}

          {status === "Aguardando Confirmação" && (
            <>
              <ButtonIcon
                description="Aceitar"
                icon="Check"
                onClick={() => handleChangeStatusOrder(id, "Em Preparo")}
              />
              <ButtonIcon
                description="Recusar"
                icon="X"
                onClick={() => handleChangeStatusOrder(id, "Rejeitado")}
              />
            </>
          )}
          <ButtonIcon
            description="Alterar Status"
            icon="Replace"
            onClick={() => handleOrderDialogChangeStatus(id)}
          />
        </div>
      );
    },
  },
];
