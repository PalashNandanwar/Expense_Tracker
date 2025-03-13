import React from "react";
import { useSelector } from "react-redux";

const TotalComponent = () => {
    const totalBudget = useSelector((state) => Number(state.expenses.totalBudget) || 0);
    const expenses = useSelector((state) => state.expenses.expenses || []);

    const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
    const remainingBudget = totalBudget - totalExpenses;

    // Group expenses by type and calculate total spent per type
    const expenseByType = expenses.reduce((acc, expense) => {
        acc[expense.type] = (acc[expense.type] || 0) + Number(expense.amount);
        return acc;
    }, {});

    // Sort expense types by total spent in descending order
    const sortedExpenses = Object.entries(expenseByType)
        .sort((a, b) => b[1] - a[1]) // Sort by total spending (highest first)
        .map(([type, total]) => ({ type, total }));

    // Get the highest and second-highest spending categories
    const maxExpenseType = sortedExpenses[0] || { type: null, total: 0 };
    const secondMaxExpenseType = sortedExpenses[1] || { type: null, total: 0 };

    // Find the most expensive expense within each of these categories
    const findMostExpensiveExpense = (type) =>
        expenses
            .filter((expense) => expense.type === type)
            .reduce((max, expense) => (Number(expense.amount) > Number(max.amount) ? expense : max), { amount: 0 });

    const mostExpensiveExpenseMax = findMostExpensiveExpense(maxExpenseType.type);
    const mostExpensiveExpenseSecondMax = findMostExpensiveExpense(secondMaxExpenseType.type);

    return (
        <div className="w-[40%] p-6 flex flex-col items-center shadow-lg rounded-lg border border-gray-300">
            <h2 className="text-2xl font-extrabold text-blue-700 mb-2">Budget Overview</h2>

            {/* Budget Details */}
            <div className="flex gap-4 items-center justify-center">
                <p className="w-full h-fit text-lg font-semibold bg-white shadow-md px-4 py-2 rounded-md border border-gray-300">
                    Total Budget: <span className="text-blue-600 font-bold">${totalBudget}</span>
                </p>

                <p className="w-full h-fit text-lg font-semibold bg-white shadow-md px-4 py-2 rounded-md border border-gray-300">
                    Total Expenses: <span className="text-red-500 font-bold">${totalExpenses}</span>
                </p>
            </div>

            {/* Remaining Budget */}
            <p className={`text-lg font-semibold bg-white shadow-md px-4 py-2 rounded-md border border-gray-300 my-6 
                ${remainingBudget < 0 ? "text-red-700" : "text-green-700"}`}>
                Remaining Budget: <span className="font-bold">${remainingBudget}</span>
            </p>

            {remainingBudget < 0 && (
                <p className="text-red-700 font-bold mt-2 animate-bounce">⚠ Budget Exceeded!</p>
            )}

            {/* Highest Spending Category */}
            {maxExpenseType.type && (
                <div className="mt-4 p-4 w-full bg-gray-100 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-lg font-bold text-blue-700">Highest Spending Category:</h3>
                    <p className="text-gray-700 font-semibold">📌 {maxExpenseType.type} - ₹{maxExpenseType.total}</p>

                    {mostExpensiveExpenseMax.name && (
                        <p className="text-gray-600 mt-2">
                            💰 Most Expensive: <span className="font-semibold">{mostExpensiveExpenseMax.name}</span>
                            (<span className="text-red-500 font-bold">₹{mostExpensiveExpenseMax.amount}</span>)
                        </p>
                    )}
                </div>
            )}

            {/* Second Highest Spending Category */}
            {secondMaxExpenseType.type && (
                <div className="mt-4 p-4 w-full bg-gray-100 rounded-lg shadow-md border border-gray-300">
                    <h3 className="text-lg font-bold text-blue-700">Second Highest Spending Category:</h3>
                    <p className="text-gray-700 font-semibold">📌 {secondMaxExpenseType.type} - ₹{secondMaxExpenseType.total}</p>

                    {mostExpensiveExpenseSecondMax.name && (
                        <p className="text-gray-600 mt-2">
                            💰 Most Expensive: <span className="font-semibold">{mostExpensiveExpenseSecondMax.name}</span>
                            (<span className="text-red-500 font-bold">₹{mostExpensiveExpenseSecondMax.amount}</span>)
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default TotalComponent;
