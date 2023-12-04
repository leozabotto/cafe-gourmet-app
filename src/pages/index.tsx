import { CardSelectModule } from "@/components";
import { ModulesTemplate } from "@/templates";

export function SelectModule() {
  return (
    <div className="h-screen">
      <ModulesTemplate subtitle="Selecione um módulo para iniciar">
        <div className="flex flex-col gap-2 sm:flex-row">
          <CardSelectModule to="user-area/sign-in">
            Área do Cliente
          </CardSelectModule>
          <CardSelectModule to="admin-area/sign-in">
            Área do Adminstrador
          </CardSelectModule>
        </div>
      </ModulesTemplate>
    </div>
  );
}
