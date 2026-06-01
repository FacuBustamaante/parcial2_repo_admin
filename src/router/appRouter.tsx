import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "../shared/layout/AppLayout";
import { AuthLayout } from "../shared/layout/AuthLayout";
import { LoginPage } from "../modules/auth/index";
import { RegisterPage } from "../modules/auth/index";
import { ProtectedRoute } from "./ProtectedRoute";
import PedidoCajeroPage from "../modules/pedido/pages/PedidoCajeroPage";
import IngredientePage from "../modules/ingrediente/pages/IngredientePage";
import CategoriaPage from "../modules/categoria/pages/CategoriaPage";
import ProductoPage from "../modules/producto/pages/ProductoPage";
import AdminPage from "../modules/admin/pages/AdminPage";
import Statistics from "../modules/admin/pages/Statistics";
import CocinaPage from "../modules/KDS/pages/CocinaPage";
import Forbidden from "../shared/layout/Forbidden";

export const AppRouter = () => {
   return (
      <BrowserRouter>
         <Routes>
            {/* ────────────────────────────────── Auth ───────────────────────────────────── */}
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

            {/* ────────────────────────────────── App ───────────────────────────────────── */}
            <Route element={<AppLayout />}>
               {/* ───────────────────────────────────── Cajero ───────────────────────────────────── */}
               <Route
                  element={<ProtectedRoute allowedRoles={["ADMIN", "CAJERO"]} />}
               >
                  <Route path="/cajero" element={<PedidoCajeroPage />} />
               </Route>

               {/* ───────────────────────────────────── Stock ───────────────────────────────────── */}
               <Route element={<ProtectedRoute allowedRoles={["ADMIN", "STOCK"]} />}>
                  <Route path="/ingredientes" element={<IngredientePage />} />
                  <Route path="/categorias" element={<CategoriaPage />} />
                  <Route path="/productos" element={<ProductoPage />} />
               </Route>

               {/* ───────────────────────────────────── Admin ───────────────────────────────────── */}
               <Route element={<ProtectedRoute allowedRoles={["ADMIN"]} />}>
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/statistics" element={<Statistics />} />
               </Route>
               {/* ───────────────────────────────────── Cocina  ───────────────────────────────────── */}
               <Route element={<ProtectedRoute allowedRoles={["ADMIN", "COCINA"]} />}>
                  <Route path="/cocina" element={<CocinaPage />} />
               </Route>
            </Route>

            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
         </Routes>
      </BrowserRouter>
   );
};
