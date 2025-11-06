import React from "react";

/**
 * Single Todo item. React.memo is used so it only re-renders when its props change.
 */
export const TodoItem = React.memo(function TodoItem({ todo, index }) {
  // small render-slow simulation is intentionally omitted here to keep item render cheap.
  return (
    <li>
      {index + 1}. {todo}
    </li>
  );
});

/**
 * TodoList: memoized to avoid re-render if parent re-renders but todos prop is same reference.
 * Important: parent should pass the same array reference to avoid re-rendering; we update todos via state,
 * so when todos changes it will re-render the list as expected.
 */
export const TodoList = React.memo(function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((t, idx) => (
        <TodoItem key={`${t}-${idx}`} todo={t} index={idx} />
      ))}
    </ul>
  );
});
