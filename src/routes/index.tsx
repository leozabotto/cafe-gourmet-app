import { SelectModule } from "@/pages";
import { ChoiceScreen } from "@/pages/choice-screen";
import { Orders } from "@/pages/admin-area/orders";
import { Products } from "@/pages/admin-area/products";
import { SignIn } from "@/pages/sign-in";
import { SignUp } from "@/pages/sign-up";
import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Buy } from "@/pages/user-area/buy";
import { Cart } from "@/pages/user-area/cart";

import { PrivateRoutes } from "./private.routes";
import { PublicRoutes } from "./public.routes";
import { UserRoutes } from "./user.routes";
import { AdminRoutes } from "./admin.routes";
import { MyAddress } from "@/pages/user-area/my-address";
import { MyOrders } from "@/pages/user-area/my-orders";

export function Router() {
  return (
    <Suspense>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<SelectModule />} />
          <Route path="/admin-area/sign-in" element={<SignIn type="admin" />} />
          <Route path="/user-area/sign-in" element={<SignIn type="user" />} />
          <Route path="/user-area/sign-up" element={<SignUp />} />
        </Route>

        <Route element={<PrivateRoutes />}>
          <Route element={<AdminRoutes />}>
            <Route path="/admin-area" element={<ChoiceScreen type="admin" />} />
            <Route path="/admin-area/products" element={<Products />} />
            <Route path="/admin-area/orders" element={<Orders />} />
          </Route>
          <Route element={<UserRoutes />}>
            <Route path="/user-area" element={<ChoiceScreen type="user" />} />
            <Route path="/user-area/buy" element={<Buy />} />
            <Route path="/user-area/cart" element={<Cart />} />
            <Route path="/user-area/my-address" element={<MyAddress />} />
            <Route path="/user-area/my-orders" element={<MyOrders />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}
