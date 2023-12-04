import {
  Breadcrumb,
  DataTable,
  Header,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import { OrdersColumns, columns } from "./columns";
import { OrderDetailsDialog } from "./order-details-dialog";
import { useState } from "react";
import {
  Order,
  OrderResponse,
  OrderServices,
  OrderStatus,
  useOrderFindAll,
} from "@/services";
import { useToast } from "@/components/ui/use-toast";
import { OrderChangeStatusDialog } from "./order-change-status-dialog";

export function Orders() {
  const { toast } = useToast();

  const [openDialogChangeStatus, setDialogChangeStatus] = useState(false);
  const [openDialogOrderDetails, setOpenDialogOrderDetails] = useState(false);
  const [currentSelectedOrder, setCurrentSelectedOrder] =
    useState<OrderResponse>();

  const { data: request, refetch } = useOrderFindAll();

  const dataMapped =
    request?.map<OrdersColumns>((items) => ({
      id: items.id,
      customer: items.customer.name,
      phone: items.customer.phoneNumber,
      status: items.status,
      total: items.total,
    })) || [];

  const dataQueue: OrdersColumns[] = dataMapped?.filter(
    (data) => data.status === "Aguardando Confirmação"
  );

  const dataWaiting: OrdersColumns[] = dataMapped?.filter(
    (data) => data.status === "Em Preparo"
  );

  const dataEnded: OrdersColumns[] = dataMapped?.filter(
    (data) => data.status === "Concluído"
  );

  const dataRejected: OrdersColumns[] = dataMapped?.filter(
    (data) => data.status === "Rejeitado"
  );

  const tableColumns = columns({
    handleDialogOrderDetails,
    handleChangeStatusOrder,
    handleOrderDialogChangeStatus,
  });

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

  function handleOrderDialogChangeStatus(id: number) {
    setDialogChangeStatus((prev) => !prev);

    const order = findOrder(id);

    if (order) {
      setCurrentSelectedOrder(order);
    }
  }

  async function handleChangeStatusOrder(id: number, type: OrderStatus) {
    const order = findOrder(id);

    if (order) {
      const orderUpdated: Order = {
        id: order.id,
        date: order.date,
        status: type,
        total: order.total,
      };

      await OrderServices.update(id, orderUpdated)
        .then(() => {
          toast({
            title: `O pedido #${order.id} teve seu estado alterado para: ${type}`,
          });
          refetch();
        })
        .catch(() => {
          toast({
            title: `Occoreu um erro ao mudar o status do pedido #${order.id}`,
            variant: "destructive",
          });
        });
    }
  }

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header />
        <div className="container mt-9 flex w-full flex-col gap-6">
          <Breadcrumb
            items={[
              { name: "Adminstração", url: "/admin-area" },
              { name: "Gerenciar Pedidos" },
            ]}
          />
          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
            <Tabs defaultValue="queue" className="w-full">
              <TabsList>
                <TabsTrigger value="queue">Fila</TabsTrigger>
                <TabsTrigger value="waiting">Em Andamento</TabsTrigger>
                <TabsTrigger value="ended">Finalizados</TabsTrigger>
                <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
              </TabsList>
              <TabsContent value="queue">
                <DataTable columns={tableColumns} data={dataQueue} />
              </TabsContent>
              <TabsContent value="waiting">
                <DataTable columns={tableColumns} data={dataWaiting} />
              </TabsContent>
              <TabsContent value="ended">
                <DataTable columns={tableColumns} data={dataEnded} />
              </TabsContent>
              <TabsContent value="rejected">
                <DataTable columns={tableColumns} data={dataRejected} />
              </TabsContent>
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

          <OrderChangeStatusDialog
            open={openDialogChangeStatus}
            setOpen={setDialogChangeStatus}
            order={currentSelectedOrder}
            handleChangeStatusOrder={handleChangeStatusOrder}
          />
        </>
      )}
    </>
  );
}
