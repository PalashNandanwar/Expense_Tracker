// import React, { useState } from "react";
// import { IoIosAdd } from "react-icons/io";
// import { FaFilter } from "react-icons/fa";
// import ExpenseAdd from "./ExpenseAdd";
// import { useSelector, useDispatch } from "react-redux";
// import { deleteExpense } from "../Redux/expenseSlice";
// import BudgetInput from "./BudgetInput";

// const Sidebar = () => {
//     const [showForm, setShowForm] = useState(false);
//     const [editExpense, setEditExpense] = useState(null);
//     const expenses = useSelector((state) => state.expenses.expenses);
//     const dispatch = useDispatch();

//     const handleDelete = (id) => {
//         const isConfirmed = window.confirm("Are you sure you want to delete this expense?");
//         if (isConfirmed) {
//             dispatch(deleteExpense(id));
//         }
//     };

//     const handleEdit = (expense) => {
//         setEditExpense(expense);  // Set the selected expense for editing
//         setShowForm(true);  // Open the form
//     };

//     return (
//         <div className="w-1/4 shadow-md flex flex-col gap-4 p-4">
//             <BudgetInput />

//             <div className="flex justify-around">
//                 <button
//                     className="flex items-center justify-center gap-1 shadow-lg bg-blue-500 text-white px-4 py-2 rounded-md"
//                     onClick={() => {
//                         setEditExpense(null);  // Ensure form is reset for adding new expense
//                         setShowForm(true);
//                     }}
//                 >
//                     <IoIosAdd className="text-2xl" /> Add Expense
//                 </button>

//                 <button className="flex items-center justify-center gap-1 shadow-lg bg-gray-500 text-white px-4 py-2 rounded-md">
//                     <FaFilter /> Add Filter
//                 </button>
//             </div>

//             {/* Expense List */}
//             <div className="mt-4 shadow-md border border-gray-300 rounded-lg">
//                 <h2 className="text-2xl font-bold text-center mt-4">Your Expenses List</h2>
//                 {expenses.length === 0 ? (
//                     <p className="text-gray-500 text-center">No expenses added.</p>
//                 ) : (
//                     <div className="h-[600px] overflow-hidden">
//                         <ul className="mt-2 h-full overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
//                             {expenses.map((exp) => (
//                                 <li
//                                     key={exp.id}
//                                     className="flex flex-col border p-2 rounded mt-2 bg-gray-100 shadow-sm"
//                                 >
//                                     <div className="flex flex-col">
//                                         <span className="text-lg font-bold flex gap-4 items-center">
//                                             {exp.name}
//                                             <span className="text-xs uppercase text-gray-500">{exp.type}</span>
//                                         </span>
//                                         <span className="text-md font-semibold text-red-600">₹{exp.amount}</span>
//                                     </div>
//                                     <div className="flex gap-1 mt-2">
//                                         <button
//                                             onClick={() => handleDelete(exp.id)}
//                                             className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                         >
//                                             Delete
//                                         </button>

//                                         <button
//                                             onClick={() => handleEdit(exp)}
//                                             className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
//                                         >
//                                             Edit
//                                         </button>
//                                     </div>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {showForm && <ExpenseAdd onClose={() => setShowForm(false)} editingExpense={editExpense} />}
//         </div>
//     );
// };

// export default Sidebar;


import React, { useState } from "react";
import { IoIosAdd } from "react-icons/io";
import ExpenseAdd from "./ExpenseAdd";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense } from "../Redux/expenseSlice";
import BudgetInput from "./BudgetInput";

const Sidebar = () => {
    const [showForm, setShowForm] = useState(false);
    const [editExpense, setEditExpense] = useState(null);
    const [filterType, setFilterType] = useState(""); // Expense type filter
    const [filterDate, setFilterDate] = useState(""); // Date filter

    const expenses = useSelector((state) => state.expenses.expenses);
    const dispatch = useDispatch();

    const handleDelete = (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this expense?");
        if (isConfirmed) {
            dispatch(deleteExpense(id));
        }
    };

    const handleEdit = (expense) => {
        setEditExpense(expense);
        setShowForm(true);
    };

    // Filter Expenses
    const filteredExpenses = expenses.filter((exp) => {
        return (
            (!filterType || exp.type === filterType) &&
            (!filterDate || exp.timestamp.startsWith(filterDate))
        );
    });

    return (
        <div className="w-1/4 shadow-md flex flex-col gap-4 p-4">
            <BudgetInput />


            <button
                className="flex items-center justify-center gap-1 shadow-lg bg-blue-500 text-white px-4 py-2 rounded-md"
                onClick={() => {
                    setEditExpense(null);
                    setShowForm(true);
                }}
            >
                <IoIosAdd className="text-2xl" /> Add Expense
            </button>
            <h1>Filter Menu</h1>
            <div className="flex gap-2">
                <select
                    className="w-1/2 border p-2 rounded text-sm"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="income">Income</option>
                    <option value="Housing">Housing</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Food">Food</option>
                    <option value="Transportation">Transportation</option>
                    <option value="Entertainment">Entertainment</option>
                </select>

                <input
                    type="date"
                    className="w-1/2 border p-2 rounded text-sm"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                />
            </div>

            {/* Expense List */}
            <div className="mt-4 shadow-md border border-gray-300 rounded-lg">
                <h2 className="text-2xl font-bold text-center mt-4">Your Expenses List</h2>
                {filteredExpenses.length === 0 ? (
                    <p className="text-gray-500 text-center">No expenses found.</p>
                ) : (
                    <div className="h-[600px] overflow-hidden">
                        <ul className="mt-2 h-full overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                            {filteredExpenses.map((exp) => (
                                <li
                                    key={exp.id}
                                    className="flex flex-col border p-2 rounded mt-2 bg-gray-100 shadow-sm"
                                >
                                    <div className="flex flex-col">
                                        <span className="text-lg font-bold flex gap-4 items-center">
                                            {exp.name}
                                            <span className="text-xs uppercase text-gray-500">{exp.type}</span>
                                        </span>
                                        <span className="text-md font-semibold text-red-600">₹{exp.amount}</span>
                                    </div>
                                    <div className="flex gap-1 mt-2">
                                        <button
                                            onClick={() => handleDelete(exp.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                        >
                                            Delete
                                        </button>

                                        <button
                                            onClick={() => handleEdit(exp)}
                                            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {showForm && <ExpenseAdd onClose={() => setShowForm(false)} editingExpense={editExpense} />}
        </div>
    );
};

export default Sidebar;
