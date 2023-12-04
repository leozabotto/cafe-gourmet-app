import { CardSelectModule, Header } from "@/components";
import { ModulesTemplate } from "@/templates";

interface ChoiceScreenProps {
  type: "user" | "admin";
}

export function ChoiceScreen({ type }: ChoiceScreenProps) {
  return (
    <div className="flex h-screen flex-col">
      <Header showCartIcon={type === "user"} />
      <div className="flex flex-1">
        <ModulesTemplate subtitle="O que deseja fazer?" disableLogo>
          <div className="container flex flex-col gap-2 sm:flex-row">
            {type === "admin" && (
              <>
                <CardSelectModule to="/admin-area/orders">
                  Gerenciar Pedidos
                </CardSelectModule>
                <CardSelectModule to="/admin-area/products">
                  Gerenciar Produtos
                </CardSelectModule>
              </>
            )}

            {type === "user" && (
              <>
                <CardSelectModule to="/user-area/buy">Comprar</CardSelectModule>
                <CardSelectModule to="/user-area/my-orders">
                  Meus Pedidos
                </CardSelectModule>
                <CardSelectModule to="/user-area/my-address">
                  Meus Endereços
                </CardSelectModule>
              </>
            )}
          </div>
        </ModulesTemplate>
      </div>
    </div>
  );
}
