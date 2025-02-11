"use client";

import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo } from "@/utils/api";
import { TodoListProps, Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  onDelete,
  loading: initialLoading,
  error: initialError,
}: TodoListProps) => {
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | null>(initialError);
  const [sortedTodos, setSortedTodos] = useState<Todo[]>(todos);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  useEffect(() => {
    if (todos.length === 0 && !loading) {
      setLoading(true);
      fetchTodos()
        .then((fetchedTodos) => {
          setSortedTodos(fetchedTodos);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to load todos");
          setLoading(false);
        });
    } else {
      setSortedTodos(todos);
    }
  }, [todos]); 

  const handleSort = () => {
    const sorted = [...sortedTodos].sort((a, b) => (
      a.completed === b.completed ? 0 : a.completed ? 1 : -1
    ));
    setSortedTodos(isSorted ? [...todos] : sorted);
    setIsSorted(!isSorted);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      onDelete(id);
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div suppressHydrationWarning={true}>
      <button
        onClick={handleSort}
        className="p-2 m-2 bg-gray-600 hover:bg-gray-900 text-white rounded-md"
      >
        {isSorted ? "Reset Sort" : "Sort by Completed Status"}
      </button>

      {loading ? (
        <div className="text-gray-500 animate-pulse">Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : sortedTodos.length === 0 ? (
        <div>No todos available</div>
      ) : (
        sortedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default TodoList;