import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import UserContext from "../../../store/user-context";
import {
  sendGetRequest,
  sendPostRequest,
  sendPatchRequest,
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
        const response = await sendGetRequest("/api/v1/todolist/");
        console.log("Todos response:", response); // Log response for debugging
        if (response.data && Array.isArray(response.data.data)) {
          setTodos(response.data.data);
        } else {
          showAlert("error", "Invalid response format for todos.");
        }
      } catch (error) {
        showAlert("error", error);
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

      await sendPostRequest("/api/v1/todolist", {
        toDo: newTodo,
      });

      const response = await sendGetRequest("/api/v1/todolist");
      console.log("Add todo response:", response); // Log response for debugging

      if (response.data && Array.isArray(response.data.data)) {
        setTodos(response.data.data);
        setNewTodo("");
        showAlert("success", "Todo item added successfully!");
      } else {
        showAlert("error", "Invalid response format for todos.");
      }
    } catch (error) {
      showAlert("error", error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await sendDeleteRequest(`/api/v1/todolist/${todoId}`);
      console.log("Delete Todo URL:", `/api/v1/todolist/${todoId}`);

      const updatedTodos = todos.filter((todo) => todo._id !== todoId);
      setTodos(updatedTodos);

      showAlert("success", "Todo item deleted successfully!");
    } catch (error) {
      showAlert("error", error);
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
          {todos.map((todo) => (
            <Card key={todo._id} className="todo-card">
              <Card.Body>
                <Card.Text>{todo.toDo}</Card.Text>
                <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default TodoList;
