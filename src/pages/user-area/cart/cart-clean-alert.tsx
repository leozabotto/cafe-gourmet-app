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
import { useCart } from "@/stores";

interface CartCleanAlertProps {
  open: boolean;
  setOpen(value: boolean): void;
}

export function CartCleanAlert({ open, setOpen }: CartCleanAlertProps) {
  const { cleanCart } = useCart()

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Ao confirmar esta ação, o seu carrinho será esvaziado e todos os
            itens serão perdidos. Tem a certeza de que deseja prosseguir?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={cleanCart}>Confirmar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
