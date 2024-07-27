// HomePage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./ExpenseForm.jsx";
import ExpenseList from "./ExpenseList.jsx";
import BalanceList from "./BalanceList.jsx";

const HomePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState(null);
  const [total, setTotal] = useState(null);
  const [shared, setShared] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get-expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    const fetchBalances = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/calculate");
        setBalances(response.data.results);
        setTotal(response.data?.totalSpent);
        setShared(response.data?.sharePerPerson);
      } catch (error) {
        console.error("Error fetching balances:", error);
      }
    };

    fetchExpenses();
    fetchBalances();
  }, []);

  const handleNewExpense = async (newExpense) => {
    try {
      const response = await axios.post("http://localhost:5000/api/AddExpenses", newExpense);
      setExpenses([...expenses, response.data]);
      fetchBalances(); // Refresh balances after adding new expense
    } catch (error) {
      console.error("Error adding new expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:5000/api/delete-expenses/${expenseId}`);
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
      fetchBalances(); // Refresh balances after deleting expense
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = async (editedExpense) => {
    try {
      await axios.put(`http://localhost:5000/api/edit-expenses/${editedExpense._id}`, editedExpense);
      const updatedExpenses = expenses.map((expense) =>
        expense._id === editedExpense._id ? editedExpense : expense
      );
      setExpenses(updatedExpenses);
      fetchBalances(); // Refresh balances after editing expense
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  return (
    <div className="HomePage bx">
      <h1 className="mb-3">Expenses</h1>

      <ExpenseForm onNewExpense={handleNewExpense} />
      <div className="bx mt-4">
        <h2>Total Amount: Rs. {total}</h2>
        <h2>Per Person: Rs. {shared}</h2>
      </div>

      <div className="bx mt-4 mb-4">
        <h1>Balances</h1>
        {balances && <BalanceList balances={balances} />}
      </div>

      <div className="bx mt-4 mb-4">
        <h1>Expense List</h1>
        <ExpenseList expenses={expenses} onDelete={handleDeleteExpense} onEdit={handleEditExpense} />
      </div>
    </div>
  );
};

export default HomePage;
