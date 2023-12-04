import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./routes/index.tsx";
import { BrowserRouter } from "react-router-dom";

import { Toaster } from "./components";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import "./globals.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Router />
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
