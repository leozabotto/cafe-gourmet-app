/* eslint-disable react-refresh/only-export-components */
import { ButtonIcon, StatusView } from "@/components";
import { OrderStatus } from "@/services";
import { formatMoneyBRL } from "@/utils";
import { ColumnDef } from "@tanstack/react-table";

export type OrdersColumns = {
  id: number;
  total: string;
  status: OrderStatus;
  paymentForm: string
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
}

export const columns = ({
  handleDialogOrderDetails,
}: ColumnsProps): ColumnDef<OrdersColumns>[] => [
  {
    accessorKey: "id",
    header: "Código",
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
    accessorKey: "paymentForm",
    header: "Forma de Pagamento",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const id = Number(row.original.id);

      return (
        <div className="flex gap-1">
          <ButtonIcon
            description="Detalhes"
            icon="Eye"
            onClick={() => handleDialogOrderDetails(id)}
          />
        </div>
      );
    },
  },
];
