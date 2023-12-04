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
  Textarea,
  DialogFooter,
  Button,
} from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { productSchema } from "@/configs";
import { ProductResponse, ProductServices } from "@/services";
import { zodResolver } from "@hookform/resolvers/zod";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface AddProductDialogProps {
  open: boolean;
  setOpen(value: boolean): void;
  currentSelectedProduct: ProductResponse | null;
  refetch: (
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<ProductResponse[], Error>>;
}

interface ProductFormValues {
  name: string;
  description: string;
  price: string;
  image: string;
}

export function AddProductDialog({
  open,
  setOpen,
  currentSelectedProduct,
  refetch,
}: AddProductDialogProps) {
  const { toast } = useToast();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (currentSelectedProduct) {
      form.setValue("name", currentSelectedProduct.name);
      form.setValue("description", currentSelectedProduct.description);
      form.setValue("price", currentSelectedProduct.price);
      form.setValue("image", currentSelectedProduct.image);
    }
  }, [currentSelectedProduct]);

  function handleCreateProduct(values: ProductFormValues) {
    if (!currentSelectedProduct) {
      ProductServices.create(values)
        .then(() => {
          toast({
            title: "Produto criado com sucesso!",
          });

          setOpen(false);
          refetch();
        })
        .catch(() => {
          toast({
            title: "Falha ao criar o produto. Tente novamente mais tarde!",
            variant: "destructive",
          });
        });
    } else {
      ProductServices.update(currentSelectedProduct.id, {
        ...values,
        id: currentSelectedProduct.id,
        active: currentSelectedProduct.active,
      })
        .then(() => {
          toast({
            title: "Produto atualizado com sucesso!",
          });

          setOpen(false);
          refetch();
        })
        .catch(() => {
          toast({
            title: "Falha ao atualizar o produto. Tente novamente mais tarde!",
            variant: "destructive",
          });
        });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentSelectedProduct ? "Editando Produto": "Novo Produto"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form>
            <div className="flex flex-col items-center gap-9">
              <div className="flex w-full flex-col items-center gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o nome do produto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Preço</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Digite o preço do produto"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Descrição</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Digite uma descrição"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Imagem</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite a URL da imagem"
                          type="text"
                          {...field}
                        />
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
            {currentSelectedProduct ? "Atualizar" : "Cadastrar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
