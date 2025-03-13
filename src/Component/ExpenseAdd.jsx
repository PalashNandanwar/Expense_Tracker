import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, updateExpense } from "../Redux/expenseSlice";
import { v4 as uuidv4 } from "uuid";

const ExpenseAdd = ({ onClose, editingExpense }) => {
    const dispatch = useDispatch();
    const totalBudget = useSelector((state) => state.expenses.totalBudget);
    const expenses = useSelector((state) => state.expenses.expenses);

    const [expense, setExpense] = useState({
        id: editingExpense ? editingExpense.id : uuidv4(),
        type: editingExpense ? editingExpense.type : "expense",
        name: editingExpense ? editingExpense.name : "",
        amount: editingExpense ? editingExpense.amount : "",
    });

    useEffect(() => {
        if (editingExpense) {
            setExpense(editingExpense);
        }
    }, [editingExpense]);

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const expenseAmount = Number(expense.amount) || 0;

        // Calculate total spent so far
        const totalSpent = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
        const remainingBudget = totalBudget - totalSpent + (editingExpense ? Number(editingExpense.amount) : 0);

        if (expenseAmount > remainingBudget) {
            alert("Total budget exceeded! Lower your expenses.");
            return;
        }

        if (editingExpense) {
            dispatch(updateExpense(expense));
        } else {
            dispatch(
                addExpense({
                    ...expense,
                    id: uuidv4(),
                    amount: expenseAmount,
                    timestamp: new Date().toISOString(),
                })
            );
        }

        setExpense({ type: "expense", name: "", amount: "" });
        onClose();
    };

    return (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">{editingExpense ? "Edit Expense" : "Add Expense"}</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <label className="text-sm font-semibold">Type:</label>
                    <select name="type" value={expense.type} onChange={handleChange} className="border p-2 rounded">
                        <option value="">Select Type</option>
                        <option value="income">Income</option>
                        <option value="Housing">Housing</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Entertainment">Entertainment</option>
                    </select>

                    <label className="text-sm font-semibold">Name:</label>
                    <input type="text" name="name" value={expense.name} onChange={handleChange} placeholder="Expense Name" className="border p-2 rounded" required />

                    <label className="text-sm font-semibold">Amount:</label>
                    <input type="number" name="amount" value={expense.amount} onChange={handleChange} placeholder="Enter Amount" className="border p-2 rounded" required />

                    <div className="flex justify-between mt-4">
                        <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
                            {editingExpense ? "Update Expense" : "Add Expense"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ExpenseAdd;
