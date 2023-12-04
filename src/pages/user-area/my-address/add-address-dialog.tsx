import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  Input,
  FormMessage,
  Form,
  DialogFooter,
  Button,
} from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { addressSchema } from "@/configs";
import { AddressResponse } from "@/services";
import { AddressServices } from "@/services/cafe-api/request/address";
import { useUser } from "@/stores";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddAddressDialogProps {
  open: boolean;
  setOpen(value: boolean): void;
  currentSelectedAddress: AddressResponse | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<AddressResponse[], Error>>;
}

interface AddressFormValues {
  street: string;
  number: string;
  zipcode: string;
  neighborhood: string;
  state: string;
  city: string;
  complement: string;
}

export function AddAddressDialog({
  open,
  setOpen,
  currentSelectedAddress,
  refetch,
}: AddAddressDialogProps) {
  const { user } = useUser();
  const { toast } = useToast();
  const form = useForm<AddressFormValues>({
    defaultValues: {
      city: "",
      complement: "",
      neighborhood: "",
      number: "",
      state: "",
      street: "",
      zipcode: "",
    },
    resolver: zodResolver(addressSchema),
  });

  useEffect(() => {
    if (currentSelectedAddress) {
      form.setValue("street", currentSelectedAddress.street);
      form.setValue("number", currentSelectedAddress.number);
      form.setValue("zipcode", currentSelectedAddress.zipcode);
      form.setValue("city", currentSelectedAddress.city);
      form.setValue("state", currentSelectedAddress.state);
      form.setValue("complement", currentSelectedAddress.complement);
      form.setValue("neighborhood", currentSelectedAddress.neighborhood);
    }
  }, [currentSelectedAddress]);

  function handleCreateProduct(values: AddressFormValues) {
    if (!currentSelectedAddress) {
      AddressServices.create({
        ...values,
        customerId: user?.id || 0,
      })
        .then(() => {
          toast({
            title: "Endereço criado com sucesso!",
          });

          setOpen(false);
          refetch();
        })
        .catch(() => {
          toast({
            title: "Falha ao criar o endereço. Tente novamente mais tarde!",
            variant: "destructive",
          });
        });
    } else {
      AddressServices.update(currentSelectedAddress.id, {
        ...values,
        id: currentSelectedAddress.id,
        customerId: user?.id || 0,
      })
        .then(() => {
          toast({
            title: "Endereço atualizado com sucesso!",
          });

          setOpen(false);
          refetch();
        })
        .catch(() => {
          toast({
            title: "Falha ao atualizar o endereço. Tente novamente mais tarde!",
            variant: "destructive",
          });
        });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {currentSelectedAddress ? "Editando Endereço" : "Novo Endereço"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form>
            <div className="flex flex-col items-center gap-9">
              <div className="flex w-full flex-col items-center gap-2">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite a rua" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o número" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o bairro" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite a cidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o estado" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipcode"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o CEP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="complement"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o complemento" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>

        <DialogFooter>
          <Button
            variant="ghost"
            className="text-destructive hover:text-destructive/90"
            onClick={() => setOpen(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            onClick={form.handleSubmit(handleCreateProduct)}
          >
            {currentSelectedAddress ? "Atualizar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
