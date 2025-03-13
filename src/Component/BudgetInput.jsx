import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTotalBudget } from "../Redux/expenseSlice";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { MdClear } from "react-icons/md";



const BudgetInput = () => {
    const dispatch = useDispatch();
    const totalBudget = useSelector((state) => state.expenses.totalBudget || 0);
    const [budget, setBudget] = useState("");
    const [isEditing, setIsEditing] = useState(totalBudget === 0); // Show input initially if no budget is set

    const handleSetBudget = () => {
        if (budget && budget > 0) {
            dispatch(setTotalBudget(Number(budget)));
            setIsEditing(false); // Hide input UI after setting budget
        } else {
            alert("Please enter a valid budget amount!");
        }
    };

    const clearBudget = () => {
        dispatch(setTotalBudget(0)); // Reset budget in Redux store
        setBudget(""); // Reset local input state
        setIsEditing(true); // Show input field again
    };

    return (
        <div className="w-full p-6 flex flex-col items-center bg-gray-100 shadow-lg rounded-lg border border-gray-300">
            <h2 className="text-2xl font-bold text-gray-700">Set Daily Budget</h2>

            {isEditing ? (
                <div className="w-full flex flex-col items-center">
                    <input
                        type="number"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="Enter your daily budget"
                        className="border-2 p-2 w-1/2 mt-2 rounded text-center outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={handleSetBudget}
                        className="mt-3 bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all duration-300">
                        Set Budget
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <p className="text-lg text-center flex flex-col font-semibold bg-white shadow-md px-6 py-3 rounded-md border border-gray-400 mt-4">
                        Your Daily Budget <span className="text-blue-600 font-bold">${totalBudget}</span>
                    </p>
                    <div className=" flex gap-4">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-4 mt-3 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-all duration-300">
                            <span><MdOutlinePublishedWithChanges /></span> Budget
                        </button>

                        <button
                            onClick={clearBudget}
                            className="flex items-center gap-4 mt-3 bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-all duration-300">
                            <span><MdClear /></span> Budget
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BudgetInput;
