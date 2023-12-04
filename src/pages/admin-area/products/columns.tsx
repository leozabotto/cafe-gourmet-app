import { ButtonIcon, StatusView } from "@/components";
import { ColumnDef } from "@tanstack/react-table";

export type ProductsColumns = {
  id: string;
  name: string;
  price: string;
  description: string;
  active: boolean;
};

interface ColumnsProps {
  handleOpenDialogEditProduct(id: number): void;
  handleOpenDialogStatusChangeProduct(id: number): void;
}

export const columns = ({
  handleOpenDialogEditProduct,
  handleOpenDialogStatusChangeProduct,
}: ColumnsProps): ColumnDef<ProductsColumns>[] => [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "price",
    header: "Preço",
  },
  {
    accessorKey: "description",
    header: "Descrição",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.active;

      return (
        <StatusView
          title={status ? "Ativo" : "Inativo"}
          type={status ? "success" : "error"}
        />
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const status = row.original.active;
      const id = Number(row.original.id);

      return (
        <div className="flex gap-1">
          <ButtonIcon
            description={status ? "Inativar" : "Ativar"}
            icon={status ? "PowerOff" : "Power"}
            onClick={() => handleOpenDialogStatusChangeProduct(id)}
          />
          <ButtonIcon
            description="Editar"
            icon="Pencil"
            onClick={() => handleOpenDialogEditProduct(id)}
          />
        </div>
      );
    },
  },
];
