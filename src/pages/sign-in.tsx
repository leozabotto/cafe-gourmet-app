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
import { useUser } from "@/stores";
import { ModulesTemplate } from "@/templates";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/configs";

type SignInTypeAllowed = "user" | "admin";

interface SignInProps {
  type: SignInTypeAllowed;
}

interface SignInFormValues {
  email: string;
  password: string;
}

const SubTitleSignIn: Record<SignInTypeAllowed, string> = {
  user: "Área do Usuário",
  admin: "Área do Adminstrador",
};

export function SignIn({ type }: SignInProps) {
  const { toast } = useToast();
  const { decodeToken } = useUser();
  const navigate = useNavigate();

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  async function handleLogin(values: SignInFormValues) {
    if (type === "user") {
      AuthServices.loginCustomer(values)
        .then(({ data }) => {
          const token = data.token;
          decodeToken(token, type);
          navigate("/user-area");
        })
        .catch(() => {
          toast({
            title: "Falha ao realizar o login!",
            variant: "destructive",
          });
        });
    }

    if (type === "admin") {
      AuthServices.loginAdmin(values)
        .then(({ data }) => {
          const token = data.token;
          decodeToken(token, type);
          navigate("/admin-area");
        })
        .catch(() => {
          toast({
            title: "Falha ao realizar o login!",
            variant: "destructive",
          });
        });
    }
  }

  return (
    <div className="h-screen">
      <ModulesTemplate subtitle={SubTitleSignIn[type]}>
        <div className="w-80">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)}>
              <div className="flex flex-col items-center gap-9">
                <div className="flex w-full flex-col items-center gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Digite seu e-mail"
                            autoComplete="email"
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
                            autoComplete="password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                  {type === "user" && (
                    <Link to="/user-area/sign-up">
                      <Button variant="link" className="w-full">
                        Criar Conta
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </ModulesTemplate>
    </div>
  );
}
