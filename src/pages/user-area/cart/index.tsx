import {
  Breadcrumb,
  Button,
  ButtonIcon,
  Header,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components";

import { formatMoneyBRL } from "@/utils";
import { useEffect, useState } from "react";
import { OrderCompletedDialog } from "./order-completed-dialog";
import { useCart, useUser } from "@/stores";
import { Link } from "react-router-dom";
import { CartCleanAlert } from "./cart-clean-alert";
import { useToast } from "@/components/ui/use-toast";
import { OrderRequest, OrderServices, useAddressFindAll } from "@/services";

export function Cart() {
  const { items, totalCart, removeProduct, updateProductAmount, cleanCart } =
    useCart();
  const { toast } = useToast();
  const { user } = useUser();

  const { data: request } = useAddressFindAll();
  const dataFiltered = request?.filter((data) => data.customerId === user?.id);

  const [openOrderCompletedDialog, setOrderCompletedDialog] = useState(false);
  const [openAlertRemoveItemsCart, setAlertRemoveItemsCart] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedPaymentForm, setSelectedPaymentForm] = useState("");
  const [lastOrderCreatedId, setLastOrderCreatedId] = useState(0);

  function findAddress(id: number) {
    return dataFiltered?.find((data) => data.id === id);
  }

  function completeOrder() {
    const address = findAddress(Number(selectedAddress));

    const orders: OrderRequest = {
      date: new Date(),
      paymentForm: selectedPaymentForm,
      items: items.map((item) => ({
        productId: item.id,
        description: item.name,
        price: item.price,
        quantity: String(item.qty),
      })),
      status: "Aguardando Confirmação",
      total: totalCart,
      addressId: address?.id || 0,
      customerId: user?.id || 0,
    };

    OrderServices.create(orders)
      .then(({ data }) => {
        setOrderCompletedDialog(true);
        setLastOrderCreatedId(data.id);
        cleanCart();
      })
      .catch(() => {
        toast({
          title: "Falha ao finalizar o pedido. Tente novamente mais tarde!",
          variant: "destructive",
        });
      });
  }

  useEffect(() => {
    if (dataFiltered && dataFiltered?.length > 0) {
      setSelectedAddress(String(dataFiltered[0].id));
    }
  }, [request]);

  return (
    <>
      <div className="mb-36 flex h-screen flex-col">
        <Header showCartIcon />
        <div className="container mt-9 flex w-full flex-col gap-6">
          <Breadcrumb
            items={[
              { name: "Usuário", url: "/user-area" },
              { name: "Carrinho" },
            ]}
          />
          <div className="flex justify-end">
            <Button
              variant="destructive"
              disabled={items.length === 0}
              onClick={() => setAlertRemoveItemsCart(true)}
            >
              Esvaziar Carrinho
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead></TableHead>
                <TableHead className="w-[50px]">Quantidade</TableHead>
                <TableHead className="w-[150px] text-right">
                  Valor Unitário
                </TableHead>
                <TableHead className="w-[150px] text-right">Total</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex gap-8">
                      <div className="h-40 w-40 overflow-hidden rounded-lg">
                        <img
                          className="h-full w-full object-cover"
                          src={product.image}
                          alt={`Imagem do produto: ${product.name}`}
                        />
                      </div>
                      <p className="text-lg">{product.name}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <ButtonIcon
                        description="Diminur"
                        icon="Minus"
                        size={12}
                        disabled={product.qty <= 1}
                        onClick={() =>
                          updateProductAmount(product, product.qty - 1)
                        }
                      />
                      {product.qty}
                      <ButtonIcon
                        description="Aumentar"
                        icon="Plus"
                        size={12}
                        onClick={() =>
                          updateProductAmount(product, product.qty + 1)
                        }
                      />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {formatMoneyBRL(Number(product.price))}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatMoneyBRL(product.total)}
                  </TableCell>
                  <TableCell className="text-center">
                    <ButtonIcon
                      description="Remover Produto"
                      icon="X"
                      onClick={() => {
                        removeProduct(product);
                        toast({
                          title: `${product.name} foi removido de seu carrinho!`,
                        });
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Total</TableCell>
                <TableCell className="text-right">
                  {formatMoneyBRL(totalCart)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            {selectedAddress && (
              <>
                <p>
                  <strong className="font-semibold">Endereço</strong>:
                </p>
                <Select
                  value={selectedAddress}
                  onValueChange={setSelectedAddress}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Endereço" />
                  </SelectTrigger>
                  <SelectContent>
                    {dataFiltered?.map((data) => (
                      <SelectItem key={data.id} value={String(data.id)}>
                        {data.street}, {data.number} {data.complement} -{" "}
                        {data.neighborhood}, {data.city} - {data.state} -{" "}
                        {data.zipcode}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}

            {!selectedAddress && (
              <>
                <p>
                  <strong className="font-semibold">Endereço</strong>: Você não
                  tem endereços cadastrados.
                </p>
              </>
            )}

            <Link to="/user-area/my-address">
              <Button className="w-full sm:w-auto" variant="secondary">
                Cadastrar
              </Button>
            </Link>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
            <p>
              <strong className="font-semibold">Forma de Pagamento</strong>:
            </p>
            <Select
              value={selectedPaymentForm}
              onValueChange={setSelectedPaymentForm}
            >
              <SelectTrigger className="max-w-[250px]">
                <SelectValue placeholder="Forma de Pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Dinheiro">Dinheiro</SelectItem>
                <SelectItem value="Cartão">Cartão</SelectItem>
                <SelectItem value="PIX">PIX</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-row justify-end gap-4 max-sm:flex-col">
            <Link to="/user-area/buy">
              <Button variant="ghost" className="max-sm:w-full">
                Voltar ao Catalálogo
              </Button>
            </Link>
            <Button
              onClick={completeOrder}
              disabled={
                items.length === 0 || !selectedAddress || !selectedPaymentForm
              }
            >
              Finalizar Compra
            </Button>
          </div>
        </div>
      </div>

      <OrderCompletedDialog
        open={openOrderCompletedDialog}
        setOpen={setOrderCompletedDialog}
        lastOrderCreatedId={lastOrderCreatedId}
      />

      <CartCleanAlert
        open={openAlertRemoveItemsCart}
        setOpen={setAlertRemoveItemsCart}
      />
    </>
  );
}
