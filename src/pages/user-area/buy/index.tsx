import { Breadcrumb, Header, Input, ProductView } from "@/components";
import { useProductsFindAll } from "@/services";
import { useState } from "react";

export function Buy() {
  const { data: request } = useProductsFindAll();

  const [search, setSearch] = useState("");

  const dataFiltered = request?.filter((items) => {
    const searchFilter =
      search === "" || items.name.toLowerCase().includes(search.toLowerCase());

    return searchFilter && items.active;
  });

  return (
    <>
      <div className="flex h-screen flex-col">
        <Header showCartIcon />
        <div className="container mt-9 flex w-full flex-col gap-6">
          <Breadcrumb
            items={[
              { name: "Usuário", url: "/user-area" },
              { name: "Comprar" },
            ]}
          />
          <div className="flex w-full flex-col justify-between gap-2 sm:flex-row">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="max-w-2xl"
              placeholder="Pesquisar..."
            />
          </div>

          <div className="flex w-full flex-col flex-wrap gap-8 sm:flex-row">
            {dataFiltered?.map((product) => (
              <ProductView
                key={product.id}
                product={{
                  ...product,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
