import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

import { Outlet } from "react-router-dom";

export default function DashboardLayout() {

    return (

        <div className="flex h-screen">

            <Sidebar />

            <div className="flex flex-col flex-1">

                <TopBar />

                <div className="flex-1 min-h-0 bg-slate-100 p-8">

                    <Outlet />

                </div>

            </div>

        </div>

    );

}