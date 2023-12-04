import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { ProductResponse, ProductServices } from "@/services";

import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

interface ProductStatusChangeAlertProps {
  open: boolean;
  setOpen(value: boolean): void;
  currentSelectedProduct: ProductResponse | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse[], Error>>;
}

export function ProductStatusChangeAlert({
  open,
  setOpen,
  currentSelectedProduct,
  refetch,
}: ProductStatusChangeAlertProps) {
  const { toast } = useToast();

  function handleCreateProduct() {
    if (currentSelectedProduct) {
      ProductServices.update(currentSelectedProduct.id, {
        ...currentSelectedProduct,
        active: !currentSelectedProduct?.active,
      })
        .then(() => {
          toast({
            title: "Status do protudo atualizado com sucesso!",
          });

          setOpen(false);
          refetch();
        })
        .catch(() => {
          toast({
            title:
              "Falha ao mudar o status o produto. Tente novamente mais tarde!",
            variant: "destructive",
          });
        });
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar esta ação, o seu produto será{" "}
            {currentSelectedProduct?.active ? "Inativado" : "Ativado"}. Tem a
            certeza de que deseja prosseguir?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreateProduct}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
