import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Layout } from "./components/Dashboard/layout/Layout";
import { useAuthStore } from "./store/auth";
import { Dashboard } from './pages/Dashboard';
import { Coupons } from './pages/Coupons';
import { Menu } from './pages/Menu';
import { Categories } from './pages/Categories';

interface PrivateRouteProps {
  isPrivate: boolean;
}

function PrivateRoute({ isPrivate }: PrivateRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute isPrivate={false} />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoute isPrivate={true} />}>
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cupons" element={<Coupons />} />
            <Route path="/cardapio" element={<Menu />} />
            <Route path="/categorias" element={<Categories />} />
          </Route>
        </Route>

        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
