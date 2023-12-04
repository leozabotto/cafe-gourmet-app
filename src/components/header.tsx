import { Link } from "react-router-dom";
import {
  Avatar,
  AvatarFallback,
  ButtonIcon,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from ".";
import { useCart, useUser } from "@/stores";

interface HeaderProps {
  showCartIcon?: boolean;
}

export function Header({ showCartIcon }: HeaderProps) {
  const { totalItemsInCart } = useCart();
  const { user, logout } = useUser()
  
  return (
    <div className="container flex w-full justify-between py-6">
      <Link to="/">
        <img className="w-32" src="/logo-vertical.svg" />
      </Link>
      <div className="flex items-center gap-3">
        {showCartIcon && (
          <Link to="/user-area/cart">
            <div className="flex items-center">
              <ButtonIcon
                title={String(totalItemsInCart)}
                description="Carrinho de Compras"
                icon="ShoppingCart"
                size={22}
                color="hsl(var(--primary))"
              />
            </div>
          </Link>
        )}
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Avatar>
              <AvatarFallback>{user?.name[0].toUpperCase()}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="flex flex-col">
              <span>{user?.name}</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
