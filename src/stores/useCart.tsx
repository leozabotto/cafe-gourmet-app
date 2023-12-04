import { ProductResponse } from "@/services";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ReceiveProductCart extends ProductResponse {
  qty: number;
}

interface ProductsCart extends ReceiveProductCart {
  total: number;
}

interface UseCartProps {
  items: ProductsCart[];
  totalCart: number;
  totalItemsInCart: number;
  updateCart(product: ReceiveProductCart): void;
  removeProduct(product: ReceiveProductCart): void;
  updateProductAmount(product: ReceiveProductCart, qty: number): void;
  cleanCart(): void;
}

function calculateTotal(cartItems: ProductsCart[]) {
  return cartItems.reduce(
    (acc, product) => acc + Number(product.price) * product.qty,
    0
  );
}

function calculateTotalItemsInCart(cartItems: ProductsCart[]) {
  return cartItems.reduce((acc, item) => acc + item.qty, 0);
}

export const useCart = create<UseCartProps>()(
  persist<UseCartProps>(
    (set, get) => ({
      items: [],
      totalCart: 0,
      totalItemsInCart: 0,
      updateCart: (product) => {
        const updatedCart = [...get().items];
        const productExists = updatedCart.find(
          (item) => item.id === product.id
        );

        const currentAmount = productExists ? productExists.qty : 0;
        const qty = currentAmount + 1;

        if (productExists) {
          productExists.qty = qty;
          productExists.total = qty * Number(productExists.price);
        } else {
          const newProduct = {
            ...product,
            total: Number(product.price) * product.qty,
          };

          updatedCart.push(newProduct);
        }

        const totalCart = calculateTotal(updatedCart);
        const totalItemsInCart = calculateTotalItemsInCart(updatedCart);

        set({
          items: updatedCart,
          totalCart,
          totalItemsInCart,
        });
      },
      removeProduct: (product) => {
        const updatedCart = [...get().items];
        const productIndex = updatedCart.findIndex(
          (item) => item.id === product.id
        );

        if (productIndex >= 0) {
          updatedCart.splice(productIndex, 1);

          const totalCart = calculateTotal(updatedCart);
          const totalItemsInCart = calculateTotalItemsInCart(updatedCart);

          set({
            items: updatedCart,
            totalCart,
            totalItemsInCart,
          });
        }
      },
      updateProductAmount: (product, qty) => {
        if (qty <= 0) {
          return;
        }

        const updatedCart = [...get().items];
        const productExists = updatedCart.find(
          (item) => item.id === product.id
        );

        if (productExists) {
          productExists.qty = qty;
          productExists.total = qty * Number(productExists.price);

          const totalCart = calculateTotal(updatedCart);
          const totalItemsInCart = calculateTotalItemsInCart(updatedCart);

          set({
            items: updatedCart,
            totalCart,
            totalItemsInCart,
          });
        } else {
          throw Error();
        }
      },
      cleanCart: () => {
        set({
          items: [],
          totalCart: 0,
          totalItemsInCart: 0,
        });
      },
    }),
    { name: "cart" }
  )
);
