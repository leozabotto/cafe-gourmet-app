import { ButtonIcon } from "@/components";
import { ColumnDef } from "@tanstack/react-table";

export type AddressColumns = {
  id: number;
  street: string;
  number: string;
  zipcode: string;
  neighborhood: string;
  state: string
  city: string;
  complement: string;
};

interface ColumnsProps {
  handleOpenDialogEditAddress(id: number): void;
}

export const columns = ({
  handleOpenDialogEditAddress,
}: ColumnsProps): ColumnDef<AddressColumns>[] => [
  {
    accessorKey: "street",
    header: "Rua",
  },
  {
    accessorKey: "number",
    header: "Número",
  },
  {
    accessorKey: "city",
    header: "Cidade",
  },
  {
    accessorKey: "state",
    header: "Estado",
  },
  {
    accessorKey: "zipcode",
    header: "CEP",
  },
  {
    accessorKey: "complement",
    header: "Complemento",
  },
  {
    accessorKey: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const id = Number(row.original.id);

      return (
        <div className="flex gap-1">
          <ButtonIcon
            description="Editar"
            icon="Pencil"
            onClick={() => handleOpenDialogEditAddress(id)}
          />
        </div>
      );
    },
  },
];
