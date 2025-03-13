import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    expenses: JSON.parse(localStorage.getItem("expenses")) || [],
    totalBudget: JSON.parse(localStorage.getItem("totalBudget")) || 0,
};

const expenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        setTotalBudget: (state, action) => {
            state.totalBudget = action.payload;
            localStorage.setItem("totalBudget", JSON.stringify(state.totalBudget));
        },
        addExpense: (state, action) => {
            const newExpense = {
                ...action.payload,
                timestamp: new Date().toISOString(),
            };
            const updatedExpenses = [...state.expenses, newExpense];
            state.expenses = updatedExpenses;
            localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
        },
        deleteExpense: (state, action) => {
            state.expenses = state.expenses.filter((expense) => expense.id !== action.payload);
            localStorage.setItem("expenses", JSON.stringify(state.expenses));
        },
        updateExpense: (state, action) => {
            state.expenses = state.expenses.map(exp =>
                exp.id === action.payload.id ? action.payload : exp
            );
        },
    },
});

export const { setTotalBudget, addExpense, deleteExpense, updateExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
