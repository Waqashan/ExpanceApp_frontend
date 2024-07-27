

import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedExpense, setEditedExpense] = useState(null);

  const handleEditModalOpen = (expense) => {
    setEditedExpense(expense);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setEditedExpense(null);
    setShowEditModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(editedExpense);
    handleEditModalClose();
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Amount (pkr)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense._id}>
              <td>{new Date(expense.createdAt).toLocaleString()}</td>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEditModalOpen(expense)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(expense._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Edit Expense Modal */}
      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={editedExpense ? editedExpense.name : ""}
                onChange={(e) =>
                  setEditedExpense({
                    ...editedExpense,
                    name: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount (pkr)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={editedExpense ? editedExpense.amount : ""}
                onChange={(e) =>
                  setEditedExpense({
                    ...editedExpense,
                    amount: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ExpenseList;

