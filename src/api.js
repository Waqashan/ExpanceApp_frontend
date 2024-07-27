import axios from 'axios';

const API_URL = "http://localhost:5000";

export const fetchExpenses = async () => {
  try {
    const response = await axios.get(`${API_URL}/get-expenses`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching expenses:", error);
  }
};

export const fetchBalances = async () => {
  try {
    const response = await axios.get(`${API_URL}/calculate`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching balances:", error);
  }
};

export const addExpense = async (newExpense) => {
  try {
    const response = await axios.post(`${API_URL}/AddExpenses`, newExpense);
    return response.data;
  } catch (error) {
    throw new Error("Error adding new expense:", error);
  }
};

export const deleteExpense = async (expenseId) => {
  try {
    await axios.delete(`${API_URL}/delete-expenses/${expenseId}`);
  } catch (error) {
    throw new Error("Error deleting expense:", error);
  }
};

export const editExpense = async (editedExpense) => {
  try {
    const response = await axios.put(`${API_URL}/edit-expenses/${editedExpense._id}`, editedExpense);
    return response.data;
  } catch (error) {
    throw new Error("Error editing expense:", error);
  }
};
