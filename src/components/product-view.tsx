import { useState } from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
} from ".";
import { useCart } from "@/stores";
import { ProductResponse } from "@/services";
import { useToast } from "./ui/use-toast";
import { formatMoneyBRL } from "@/utils";

interface ProductViewProps {
  product: ProductResponse;
}

export function ProductView({ product }: ProductViewProps) {
  const { updateCart } = useCart();
  const { toast } = useToast();

  const [openDetailsProductDialog, setOpenDetailsProductDialog] =
    useState(false);

  const [qtyItemsToAdd, setQtyItemsToAdd] = useState(1);

  function handleOpenDetailsProductDialog() {
    setOpenDetailsProductDialog((prev) => !prev);
  }

  function changeQtyItemsToAdd(qty: number) {
    if (qty > 0) {
      setQtyItemsToAdd(qty);
    }
  }

  function addItemInCart() {
    updateCart({
      ...product,
      qty: qtyItemsToAdd,
    });

    toast({
      title: `${product.name} foi adicionado ao seu carrinho!`,
    });

    setQtyItemsToAdd(1);
    setOpenDetailsProductDialog(false)
  }

  return (
    <>
      <div className="flex w-full flex-col gap-2 sm:max-w-[300px]">
        <div
          className="h-60 w-full cursor-pointer overflow-hidden rounded-lg md:h-full"
          onClick={handleOpenDetailsProductDialog}
        >
          <img
            className="h-full w-full object-cover transition-all hover:scale-110"
            src={product.image}
            alt={`Imagem do produto: ${product.image}`}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-0">
              <h4 className="text-xl">{product.name}</h4>
              <p className="text-sm text-muted-foreground">
                {product.description.slice(0, 20)}
              </p>
            </div>

            <span className="text-lg">{formatMoneyBRL(Number(product.price))}</span>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => addItemInCart()}
              className="w-full sm:w-auto"
              variant="secondary"
            >
              Adicionar ao Carrinho
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        open={openDetailsProductDialog}
        onOpenChange={setOpenDetailsProductDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{product.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-wrap gap-5">
            <div className="h-80 w-full overflow-hidden rounded-lg sm:h-40 sm:w-40 ">
              <img
                className="h-full w-full object-cover"
                src={product.image}
                alt={`Imagem do produto: ${product.image}`}
              />
            </div>
            <div className="flex flex-col">
              <p>{product.description}</p>
              <span className="text-2xl">R$ {product.price}</span>
            </div>
          </div>
          <DialogFooter>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                placeholder="Qtde"
                className="sm:max-w-[80px]"
                type="number"
                value={qtyItemsToAdd}
                onChange={(e) => changeQtyItemsToAdd(Number(e.target.value))}
              />
              <Button onClick={() => addItemInCart()}>
                Adicionar ao Carrinho
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
