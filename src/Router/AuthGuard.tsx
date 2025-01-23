import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../app/contexts/hooks/useAuth";
import { useAuthStore } from '../store/auth';

interface PrivateRouteProps {
  isPrivate: boolean;
}

export function PrivateRoute({ isPrivate }: PrivateRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}