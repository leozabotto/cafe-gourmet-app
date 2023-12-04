import { Fragment } from "react";
import { ButtonIcon } from ".";
import { Link } from "react-router-dom";

interface BreadcrumbItems {
  name: string;
  url?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItems[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex items-center gap-3 rounded-sm bg-gray-50 p-3">
      {items.length > 1 && (
        <Link to={items[items.length - 2].url || ""}>
          <ButtonIcon description="Voltar" icon="ArrowLeft" />
        </Link>
      )}
      <ul className="flex gap-2">
        {items.map((item, index) => {
          const notLastItem = items.length - 1 !== index;

          if (notLastItem) {
            return (
              <Fragment key={index}>
                <li>
                  <Link to={item.url || ""}>{item.name}</Link>
                </li>
                {notLastItem && <span>/</span>}
              </Fragment>
            );
          } else {
            return <li className="font-semibold">{item.name}</li>;
          }
        })}
      </ul>
    </div>
  );
}
