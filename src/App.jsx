// // src/App.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import ExpenseForm from "./components/ExpenseForm.jsx";
// import ExpenseList from "./components/ExpenseList.jsx";
// import BalanceList from "./components/BalanceList.jsx";
// import "./App.css";

// function App() {
//   const [expenses, setExpenses] = useState([]);
//   const [balances, setBalances] = useState(null);
//   const [total, setTotal] = useState(null);
//   const [shared, setShared] = useState(null);

//   useEffect(() => {
//     const fetchExpenses = async () => {
//       const response = await axios.get("http://localhost:5000/expenses");
//       setExpenses(response.data);
//     };
//     console.log(expenses, "exp");

//     const fetchBalances = async () => {
//       const response = await axios.get("http://localhost:5000/calculate");
//       setBalances(response.data.results);
//       setTotal(response.data?.totalSpent);
//       setShared(response.data?.sharePerPerson);
//     };

//     fetchExpenses();
//     fetchBalances();
//   }, []);

//   const handleNewExpense = (newExpense) => {
//     setExpenses([...expenses, newExpense]);
//     const fetchBalances = async () => {
//       const response = await axios.get("http://localhost:5000/calculate");
//       setBalances(response.data.results);
//       console.log(balances, "rrrr");
//     };
//     fetchBalances();
//   };

//   return (
//     <div className="App bx">
//       <h1 className="mb-3">Expenses</h1>

//       <ExpenseForm onNewExpense={handleNewExpense} />
//       <div className="bx mt-4">
//         {" "}
//         <h2>Total Amount: Rs. {total}</h2>
//         <h2>Per Person: Rs. {shared}</h2>
//       </div>

//       <div className="bx mt-4 mb-4">
//         <h1>Balances</h1>
//         {balances && <BalanceList balances={balances} />}
//       </div>
      

//       <div className="bx mt-4 mb-4"><h1>Eexpance list</h1>
//       <ExpenseList expenses={expenses} /></div>
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseForm from "./components/ExpenseForm.jsx";
import ExpenseList from "./components/ExpenseList.jsx";
import BalanceList from "./components/BalanceList.jsx";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [balances, setBalances] = useState(null);
  const [total, setTotal] = useState(null);
  const [shared, setShared] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/expenses");
        setExpenses(response.data);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    const fetchBalances = async () => {
      try {
        const response = await axios.get("http://localhost:5000/calculate");
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
      const response = await axios.post("http://localhost:5000/expenses", newExpense);
      setExpenses([...expenses, response.data]);

      // Refresh balances after adding new expense
      fetchBalances();
    } catch (error) {
      console.error("Error adding new expense:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${expenseId}`);
      setExpenses(expenses.filter((expense) => expense._id !== expenseId));

      // Refresh balances after deleting expense
      fetchBalances();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleEditExpense = async (editedExpense) => {
    try {
      await axios.put(`http://localhost:5000/expenses/${editedExpense._id}`, editedExpense);
      const updatedExpenses = expenses.map((expense) =>
        expense._id === editedExpense._id ? editedExpense : expense
      );
      setExpenses(updatedExpenses);

      // Refresh balances after editing expense
      fetchBalances();
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  return (
    <div className="App bx">
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
}

export default App;
