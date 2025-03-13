import React from "react";
import Sidebar from "./Sidebar";
import TotalComponent from "./TotalComponent";
import ShowExpenses from "./showExpenses";
import ExpenseChart from "./ExpenseChart";

const MainPart = () => {
    return (
        <div className="h-fit w-screen flex gap-4">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="w-3/4 flex flex-col">
                <div className="flex w-full h-[50%] gap-4">
                    <TotalComponent />
                    <ShowExpenses />
                </div>

                <ExpenseChart />
            </div>
        </div>
    );
};

export default MainPart;
