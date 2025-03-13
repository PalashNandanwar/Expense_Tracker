import React from "react";
import { useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const ExpenseChart = () => {
    const expenses = useSelector((state) => state.expenses.expenses || []);

    // Aggregate expenses by type efficiently
    const expenseMap = expenses.reduce((acc, expense) => {
        const amount = Number(expense.amount) || 0; // Ensure it's a number
        if (acc[expense.type]) {
            acc[expense.type] += amount;
        } else {
            acc[expense.type] = amount;
        }
        return acc;
    }, {});

    // Convert to an array for Recharts
    const expenseData = Object.keys(expenseMap).map((type) => ({
        type,
        amount: expenseMap[type],
    }));

    return (
        <div className="w-full mx-auto bg-white shadow-lg rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-700 mb-3">Expense Overview</h2>
            {expenseData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={expenseData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4A90E2" />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <p className="text-gray-500 text-center">No expenses recorded yet.</p>
            )}
        </div>
    );
};

export default ExpenseChart;
