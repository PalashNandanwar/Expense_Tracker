import React from "react";
import { useSelector } from "react-redux";

const ShowExpenses = () => {
    const expenses = useSelector((state) => state.expenses.expenses || []);

    console.log("Updated Expenses:", expenses);

    // Extract unique types dynamically
    const uniqueExpenseTypes = [...new Set(expenses.map((expense) => expense.type))];

    return (
        <div className="w-2/3 max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-4 border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 text-center">Expense List</h2>

            {/* SCROLLABLE CONTAINER */}
            <div className="h-[450px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                {uniqueExpenseTypes.length > 0 ? (
                    uniqueExpenseTypes.map((type) => {
                        const filteredExpenses = expenses.filter((expense) => expense.type === type);

                        return (
                            <div key={type} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4 border border-gray-200">
                                <h3 className="text-xl font-semibold text-blue-600">{type}</h3>

                                {filteredExpenses.length > 0 ? (
                                    <ul className="list-none mt-3 space-y-2">
                                        {filteredExpenses
                                            .sort((a, b) => Number(a.amount) - Number(b.amount)) // Sort by amount (optional)
                                            .map((expense) => (
                                                <li key={expense.id} className="flex justify-between p-3 bg-white shadow rounded-md border border-gray-300">
                                                    <span className="text-gray-800 font-medium">{expense.name}</span>
                                                    <span className="text-red-500 font-bold">₹{Number(expense.amount)}</span>
                                                </li>
                                            ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500 italic mt-2">No expenses added for this category.</p>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-gray-500 italic mt-4">No expenses recorded yet.</p>
                )}
            </div>
        </div>
    );
};

export default ShowExpenses;
