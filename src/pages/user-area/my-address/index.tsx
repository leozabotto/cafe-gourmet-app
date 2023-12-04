import { Breadcrumb, Button, DataTable, Header, Input } from "@/components";
import { AddressColumns, columns } from "./columns";
import { AddAddressDialog } from "./add-address-dialog";
import { useEffect, useState } from "react";
import { AddressResponse, useAddressFindAll } from "@/services";
import { useUser } from "@/stores";

export function MyAddress() {
  const { user } = useUser()

  const [openDialogAddAddress, setOpenDialogAddAddress] = useState(false);
  const [currentSelectedAddress, setCurrentSelectedAddress] =
    useState<AddressResponse | null>(null);

  const [search, setSearch] = useState("");

  const { data: request, refetch } = useAddressFindAll();

  const dataMapped =
    request?.filter(data => data.customerId === user?.id).map<AddressColumns>((data) => ({
      id: data.id,
      city: data.city,
      complement: data.complement,
      neighborhood: data.neighborhood,
      number: data.number,
      state: data.state,
      street: data.street,
      zipcode: data.zipcode,
    })) || [];

  const dataFiltered = dataMapped.filter((items) => {
    const searchFilter =
      search === "" ||
      items.street.toLowerCase().includes(search.toLowerCase());

    return searchFilter;
  });

  function findAddress(id: number) {
    return request?.find((item) => item.id === id);
  }

  function handleOpenDialogAddAddress() {
    setOpenDialogAddAddress((prev) => !prev);
  }

  function handleOpenDialogEditAddress(id: number) {
    handleOpenDialogAddAddress();

    const address = findAddress(id);

    if (address) {
      setCurrentSelectedAddress(address);
    }
  }

  useEffect(() => {
    if (!openDialogAddAddress) {
      setCurrentSelectedAddress(null);
    }
  }, [openDialogAddAddress]);

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header showCartIcon />
        <div className="container mt-9 flex w-full flex-col gap-6">
          <Breadcrumb
            items={[
              { name: "Usuário", url: "/user-area" },
              { name: "Meus endereços" },
            ]}
          />
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div className="flex w-full gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-2xl"
                placeholder="Pesquisar endereços por rua..."
              />
            </div>
            <Button onClick={handleOpenDialogAddAddress}>Novo Endereço</Button>
          </div>
          <DataTable
            columns={columns({
              handleOpenDialogEditAddress,
            })}
            data={dataFiltered}
          />
        </div>
      </div>

      {openDialogAddAddress && (
        <AddAddressDialog
          open={openDialogAddAddress}
          setOpen={setOpenDialogAddAddress}
          currentSelectedAddress={currentSelectedAddress}
          refetch={refetch}
        />
      )}
    </>
  );
}
