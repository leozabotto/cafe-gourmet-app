import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { useToast } from "@/components/ui/use-toast";
import { AuthServices } from "@/services";
import { ModulesTemplate } from "@/templates";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/configs";
interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  cpf: string;
  phoneNumber: string;
}

export function SignUp() {
  const { toast } = useToast();
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });
  const navigate = useNavigate();

  function handleSignUp(values: SignUpFormValues) {
    if (values.password !== values.confirmPassword) {
      form.setError("confirmPassword", { message: "Senha não confere!" });

      return;
    }

    AuthServices.signUp({
      name: values.name,
      email: values.email,
      password: values.password,
      cpf: values.cpf,
      phoneNumber: values.phoneNumber
    })
      .then(() => {
        navigate("/user-area/sign-in");
        toast({
          title: "Cadastro realizado com sucesso!",
          description:
            "Para entrar no sistema realize o login com os dados cadastrados.",
        });
      })
      .catch(() => {
        toast({
          title: "Falha ao realizar o cadastro!",
          variant: "destructive",
        });
      });
  }

  return (
    <div className="h-screen">
      <ModulesTemplate subtitle="Criar Conta">
        <div className="w-80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignUp)}>
              <div className="flex flex-col items-center gap-9">
                <div className="flex w-full flex-col items-center gap-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Nome Completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite seu nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>CPF</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Digite seu CPF"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Digite seu e-mail"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Celular</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Digite seu celular"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Digite sua senha"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Confirme sua Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Digite a confirmação de senha"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Button className="w-full">Cadastrar</Button>
                  <Link to="/user-area/sign-in">
                    <Button variant="ghost" className="w-full">
                      Voltar
                    </Button>
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </ModulesTemplate>
    </div>
  );
}
