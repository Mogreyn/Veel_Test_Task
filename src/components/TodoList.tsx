"use client";

import { useEffect, useState } from "react";
import { fetchTodos, deleteTodo } from "@/utils/api";
import { TodoListProps } from "@/types/todo";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  onDelete,
  loading: initialLoading,
  error: initialError,
}: TodoListProps) => {
  const [loading, setLoading] = useState<boolean>(initialLoading);
  const [error, setError] = useState<string | null>(initialError);

  useEffect(() => {
    async function loadTodos() {
      if (!todos.length) {
        try {
          const fetchedTodos = await fetchTodos();
        } catch (err: any) {
          setError("Failed to load todos");
        } finally {
          setLoading(false);
        }
      }
    }

    loadTodos();
  }, [todos]);

  const handleDelete = async (id: number) => {
    try {
      await deleteTodo(id);
      onDelete(id);
    } catch (err: any) {
      setError("Failed to delete todo");
    }
  };

  return (
    <div suppressHydrationWarning={true}>
      {loading ? (
        <div className="text-gray-500 animate-pulse">Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : todos.length === 0 ? (
        <div>No todos available</div>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

export default TodoList;
