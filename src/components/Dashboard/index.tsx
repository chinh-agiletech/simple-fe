import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-linear-to-br from-slate-100 to-slate-200 overflow-hidden">
      <SideBar />
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
