import { Routes, Route, BrowserRouter, } from 'react-router-dom'
import { PrivateRoute } from './AuthGuard'
import { AuthLayout } from '../layouts/AuthLayout'
import { Layout } from '../components/Dashboard/layout/Layout'
import { Coupons } from '../pages/Coupons'
import { Menu } from '../pages/Menu'
import { Categories } from '../pages/Categories'
import { Dashboard } from '../pages/Dashboard'
import { Register } from '../pages/Register'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'



export function Router() {
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