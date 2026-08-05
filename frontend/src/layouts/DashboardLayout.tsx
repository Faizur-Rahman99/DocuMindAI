import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {

    return (

        <div className="flex h-screen overflow-hidden">

            <Sidebar />

            <div className="flex flex-col flex-1 min-w-0">

                <TopBar />

                <main className="flex-1 overflow-y-auto bg-slate-100 p-8">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}