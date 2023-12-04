import { Breadcrumb, DataTable, Header, Tabs } from "@/components";
import { OrdersColumns, columns } from "./columns";

import { OrderResponse, useOrderFindAll } from "@/services";
import { useUser } from "@/stores";
import { useState } from "react";
import { OrderDetailsDialog } from "./order-details-dialog";

export function MyOrders() {
  const { user } = useUser();
  const { data: request } = useOrderFindAll();

  const [openDialogOrderDetails, setOpenDialogOrderDetails] = useState(false);
  const [currentSelectedOrder, setCurrentSelectedOrder] =
    useState<OrderResponse>();

  const dataMapped =
    request
      ?.filter((data) => data.customerId === user?.id)
      .map<OrdersColumns>((data) => ({
        id: data.id,
        status: data.status,
        total: data.total,
        paymentForm: data.paymentForm
      })) || [];

  function findOrder(id: number) {
    return request?.find((item) => item.id === id);
  }

  function handleDialogOrderDetails(id: number) {
    setOpenDialogOrderDetails((prev) => !prev);

    const order = findOrder(id);

    if (order) {
      setCurrentSelectedOrder(order);
    }
  }

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header showCartIcon />
        <div className="container mt-9 flex w-full flex-col gap-6">
          <Breadcrumb
            items={[
              { name: "Usuário", url: "/user-area" },
              { name: "Meus Pedidos" },
            ]}
          />
          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
            <Tabs defaultValue="queue" className="w-full">
              <DataTable
                columns={columns({
                  handleDialogOrderDetails,
                })}
                data={dataMapped}
              />
            </Tabs>
          </div>
        </div>
      </div>

      {currentSelectedOrder && (
        <>
          <OrderDetailsDialog
            open={openDialogOrderDetails}
            setOpen={setOpenDialogOrderDetails}
            order={currentSelectedOrder}
          />
        </>
      )}
    </>
  );
}
