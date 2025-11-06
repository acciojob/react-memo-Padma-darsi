import React, { useState, useEffect, useCallback } from "react";
import TodoStats from "./UseMemo";
import { TodoList } from "./ReactMemo";
import "./../styles/App.css";

const initialTodos = Array.from({ length: 5 }, (_, i) => `Todo ${i + 1}`);

function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [customInput, setCustomInput] = useState("");
  const [error, setError] = useState("");
  const [counter, setCounter] = useState(0);

  // Add a simple "New todo"
  const handleAddNewTodo = () => {
    setTodos((prev) => [...prev, "New todo"]);
  };

  // Add custom validated todo (>5 chars)
  const handleAddCustomTodo = (e) => {
    e.preventDefault();
    const val = customInput.trim();
    if (val.length <= 5) {
      setError("Task must be more than 5 characters.");
      return;
    }
    setTodos((prev) => [...prev, val]);
    setCustomInput("");
    setError("");
  };

  // Counter increment
  const increment = () => setCounter((c) => c + 1);

  // memo-friendly handler (so TodoList won't re-render unnecessarily due to new handler identity)
  const addTodoCallback = useCallback((text) => {
    setTodos((prev) => [...prev, text]);
  }, []);

  useEffect(() => {
    // example side effect: store length in title (just demonstrating useEffect usage)
    document.title = `Todos: ${todos.length} • Counter: ${counter}`;
    return () => {};
  }, [todos.length, counter]);

  return (
    <div className="main-container" style={{ padding: 20 }}>
      <h1>Task Management App with React.memo & useMemo</h1>

      <section style={{ marginBottom: 20 }}>
        <button onClick={handleAddNewTodo}>Add Todo (adds "New todo")</button>
        <span style={{ marginLeft: 16 }}>
          <button onClick={increment}>Increment Counter</button>
          <strong style={{ marginLeft: 8 }}>Counter: {counter}</strong>
        </span>
      </section>

      <section style={{ marginBottom: 20 }}>
        <form onSubmit={handleAddCustomTodo}>
          <input
            type="text"
            placeholder="Enter custom task (>5 chars)"
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            aria-label="custom-task-input"
          />
          <button type="submit" style={{ marginLeft: 8 }}>
            Submit
          </button>
          {error && (
            <div style={{ color: "red", marginTop: 8 }} role="alert">
              {error}
            </div>
          )}
        </form>
      </section>

      <section style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <h2>Todos ({todos.length})</h2>
          {/* TodoList is memoized via React.memo in ReactMemo.js */}
          <TodoList todos={todos} />
        </div>

        <div style={{ width: 320 }}>
          <h2>Stats (expensive calc)</h2>
          {/* TodoStats demonstrates useMemo to optimize expensive calculation */}
          <TodoStats todos={todos} />
          <div style={{ marginTop: 12 }}>
            <button onClick={() => addTodoCallback("Added via callback")}>
              Add via callback
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;


