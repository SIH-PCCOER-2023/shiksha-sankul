import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import UserContext from "../../../store/user-context";
import {
  sendGetRequest,
  sendPostRequest,
  sendDeleteRequest,
} from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";

const TodoList = (props) => {
  const userCtx = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await sendGetRequest(
          `http://localhost:8080/api/v1/todolist`
        );
        setTodos(response.data.data.data);
      } catch (error) {
        showAlert("error", error.message);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    try {
      if (!newTodo.trim()) {
        showAlert("error", "Please enter a todo item.");
        return;
      }

      await sendPostRequest(`http://localhost:8080/api/v1/todolist`, {
        toDo: newTodo,
        author: userCtx.user.id,
      });

      const response = await sendGetRequest(
        `http://localhost:8080/api/v1/todolist/`
      );
      setTodos(response.data.data.data);
      setNewTodo("");
      showAlert("success", "Todo item added successfully!");
    } catch (error) {
      showAlert("error", error.message);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await sendDeleteRequest(
        `http://localhost:8080/api/v1/todolist/${todoId}`
      );
      setTodos(todos.filter((todo) => todo._id !== todoId));
      showAlert("success", "Todo item deleted successfully!");
    } catch (error) {
      showAlert("error", error.message);
    }
  };

  return (
    <Container>
      <div className="todo-list-container">
        <div className="add-todo">
          <input
            type="text"
            placeholder="Enter todo item"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
        <div className="todos-container">
          {todos &&
            todos.map((todo) => (
              <Card key={todo._id} className="todo-card">
                <Card.Body>
                  <Card.Text>{todo.toDo}</Card.Text>
                  <button onClick={() => handleDeleteTodo(todo._id)}>
                    Delete
                  </button>
                </Card.Body>
              </Card>
            ))}
        </div>
      </div>
    </Container>
  );
};

export default TodoList;
