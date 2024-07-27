
import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ExpenseForm = ({ onNewExpense }) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [item, setItem] = useState("");
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  useEffect(() => {
    fetchFriends();
  }, []);

  const fetchFriends = async () => {
    const response = await axios.get("http://localhost:5000/api/friends");
    setFriendsList(response.data);
  };

  const handleFriendChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFriends([...friends, value]);
    } else {
      setFriends(friends.filter((friend) => friend !== value));
    }
  };

  const handleNewFriendChange = (e) => {
    setNewFriend(e.target.value);
  };

  const handleAddFriend = async () => {
    if (newFriend) {
      const response = await axios.post("http://localhost:5000/api/addFriend", { name: newFriend });
      setFriendsList([...friendsList, response.data]);
      setNewFriend("");
    }
  };

  const handleRemoveFriend = async (friendToRemove) => {
    await axios.delete(`http://localhost:5000/api/removeFriend/${friendToRemove._id}`);
    setFriendsList(friendsList.filter((friend) => friend._id !== friendToRemove._id));
    setFriends(friends.filter((friend) => friend !== friendToRemove.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:5000/api/AddExpenses", {
      name,
      amount: parseFloat(amount),
      item,
      friends,
    });
    onNewExpense(response.data);
    setName("");
    setAmount("");
    setItem("");
    // setFriends([]);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="align-items-end ">
          <Col md={3}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                as="select"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              >
                <option value="">Select name</option>
                {friendsList.map((friend) => (
                  <option key={friend._id} value={friend.name}>
                    {friend.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="formItem">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md="auto" className="mt-2 d-flex justify-content-center">
            <Button variant="primary" type="submit">
              Add Expense
            </Button>
          </Col>
        </Row>
        <Row className="mt-3 mb-4 ">
          <Col md={9}>
            <Form.Group controlId="formNewFriend">
              <h3 style={{ textAlign: "start" }}>Add new friend</h3>
              <Form.Control
                type="text"
                placeholder="Enter new friend's name"
                value={newFriend}
                onChange={handleNewFriendChange}
              />
            </Form.Group>
          </Col>
          <Col md="auto" className="d-flex align-items-end">
            <Button variant="secondary" onClick={handleAddFriend}>
              Add Friend
            </Button>
          </Col>
        </Row>
        <Row className="mt-3 bx">
          <Col sm={12}>
            <Form.Group controlId="formFriends">
              <h4 style={{ textAlign: "start" }}>Friends</h4>
              <div style={{ display: "flex", gap: "10px" }}>
                {friendsList.map((friend) => (
                  <Form.Check
                    key={friend._id}
                    type="checkbox"
                    label={friend.name}
                    value={friend.name}
                    checked={friends.includes(friend.name)}
                    onChange={handleFriendChange}
                  />
                ))}
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3 bx">
          <Col md={12}>
            <h5>Current Friends</h5>
            {friendsList.map((friend) => (
              <Row key={friend._id} className="align-items-center mb-2">
                <Col>{friend.name}</Col>
                <Col md="auto">
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFriend(friend)}
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ExpenseForm;
