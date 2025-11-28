import { Navigate, Outlet } from "react-router-dom";

export type ProtectedRouterProps = {
  redirectPath: string;
  condition: () => boolean;
};

export default function ProtectedRouter({
  redirectPath,
  condition,
}: ProtectedRouterProps) {
  if (condition()) {
    return <Outlet />;
  } else {
    return <Navigate to={{ pathname: redirectPath }} />;
  }
}
