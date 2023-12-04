import {
  Breadcrumb,
  Button,
  DataTable,
  Header,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components";
import { ProductsColumns, columns } from "./columns";
import { AddProductDialog } from "./add-product-dialog";
import { useEffect, useState } from "react";
import { ProductResponse, useProductsFindAll } from "@/services";
import { ProductStatusChangeAlert } from "./product-status-change-alert";

export function Products() {
  const [openDialogAddProduct, setOpenDialogAddProduct] = useState(false);
  const [openAlertStatusChangeProduct, setOpeAlertStatusChangeProduct] =
    useState(false);
  const [currentSelectedProduct, setCurrentSelectedProduct] =
    useState<ProductResponse | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const { data: request, refetch } = useProductsFindAll();

  const dataMapped =
    request?.map<ProductsColumns>((data) => ({
      id: String(data.id),
      name: data.name,
      description: data.description,
      price: data.price,
      active: data.active,
    })) || [];

  const dataFiltered = dataMapped.filter((items) => {
    const searchFilter =
      search === "" || items.name.toLowerCase().includes(search.toLowerCase());

    const statusFilter =
      status === "" || status === "all"
        ? items
        : status === "active"
        ? items.active
        : !items.active;

    return searchFilter && statusFilter;
  });

  function findProduct(id: number) {
    return request?.find((item) => item.id === id);
  }

  function handleOpenDialogAddProduct() {
    setOpenDialogAddProduct((prev) => !prev);
  }

  function handleOpenDialogEditProduct(id: number) {
    handleOpenDialogAddProduct();

    const product = findProduct(id);

    if (product) {
      setCurrentSelectedProduct(product);
    }
  }

  function handleOpenDialogStatusChangeProduct(id: number) {
    setOpeAlertStatusChangeProduct((prev) => !prev);

    const product = findProduct(id);

    if (product) {
      setCurrentSelectedProduct(product);
    }
  }

  useEffect(() => {
    if (!openDialogAddProduct && !openAlertStatusChangeProduct) {
      setCurrentSelectedProduct(null);
    }
  }, [openDialogAddProduct, openAlertStatusChangeProduct]);
  

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="container mt-9 flex w-full flex-col gap-6">
          <Breadcrumb
            items={[
              { name: "Adminstração", url: "/admin-area" },
              { name: "Gerenciar Produtos" },
            ]}
          />
          <div className="flex flex-col justify-between gap-2 sm:flex-row">
            <div className="flex w-full gap-2">
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="max-w-2xl"
                placeholder="Pesquisar..."
              />
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="active">Ativo</SelectItem>
                  <SelectItem value="inactive">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleOpenDialogAddProduct}>Novo Produto</Button>
          </div>
          <DataTable
            columns={columns({
              handleOpenDialogEditProduct,
              handleOpenDialogStatusChangeProduct,
            })}
            data={dataFiltered}
          />
        </div>
      </div>

      {openDialogAddProduct && (
        <AddProductDialog
          open={openDialogAddProduct}
          setOpen={setOpenDialogAddProduct}
          currentSelectedProduct={currentSelectedProduct}
          refetch={refetch}
        />
      )}

      {openAlertStatusChangeProduct && (
        <ProductStatusChangeAlert
          open={openAlertStatusChangeProduct}
          setOpen={setOpeAlertStatusChangeProduct}
          currentSelectedProduct={currentSelectedProduct}
          refetch={refetch}
        />
      )}
    </>
  );
}
