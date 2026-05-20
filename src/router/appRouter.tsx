import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { AppLayout } from "../shared/layout/AppLayout";
import { AuthLayout } from "../shared/layout/AuthLayout";

import { LoginPage } from "../modules/auth/index";
import { RegisterPage } from "../modules/auth/index";
import { ProtectedRoute } from "./ProtectedRoute";
import { PedidoCajeroPage } from "../modules/pedido/pages/PedidoCajeroPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <RegisterPage />
            </AuthLayout>
          }
        />

        <Route element={<AppLayout />}>
          <Route
            element={
              <ProtectedRoute allowedRoles={["ADMIN", "STOCK", "PEDIDOS"]} />
            }
          >
            <Route path="/cajero" element={<PedidoCajeroPage />} />
          </Route>
        </Route>
        <Route path="/forbidden" element={<h1>No autorizado</h1>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
