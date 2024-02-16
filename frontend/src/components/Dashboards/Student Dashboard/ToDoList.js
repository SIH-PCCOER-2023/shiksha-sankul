import React, { useContext, useEffect, useState } from "react";
import {
  sendGetRequest,
  sendPostRequest,
  sendDeleteRequest,
} from "../../../utils/sendHttp";
import { showAlert } from "../../../utils/alerts";
import Container from "react-bootstrap/Container";
import UserContext from "../../../store/user-context";
import FacultyHeader from "../../Header/FacultyHeader";
import FacultySidebar from "../../Sidebar/FacultySidebar";

const TodoList = (props) => {
  const userCtx = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await sendGetRequest(
          `http://localhost:8080/api/v1/todolist/`
        );
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

      await sendPostRequest(`http://localhost:8080/api/v1/todolist`, {
        content: newTodo,
      });

      const response = await sendGetRequest(
        `http://localhost:8080/api/v1/todolist`
      );

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
      await sendDeleteRequest(`http://localhost:8080/api/v1/todos/${todoId}`);

      const updatedTodos = todos.filter((todo) => todo._id !== todoId);
      setTodos(updatedTodos);

      showAlert("success", "Todo item deleted successfully!");
    } catch (error) {
      showAlert("error", error);
    }
  };

  return (
    <>
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
            <div key={todo._id} className="todo">
              <p>{todo.content}</p>
              <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
