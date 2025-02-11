import { useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import { fetchTodos, deleteTodo, createTodo } from "@/utils/api";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodos() {
      try {
        const fetchedTodos = await fetchTodos();
        setTodos(fetchedTodos);
      } catch (err) {
        setError("Failed to load todos");
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
  }, []);

  const addTodo = async (title: string) => {
    try {
      const newTodo = await createTodo(title);
      setTodos((prevTodos) => [newTodo, ...prevTodos]);
    } catch (err) {
      setError("Failed to add todo");
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (err) {
      setError("Failed to delete todo");
    }
  };

  return { todos, loading, error, addTodo, removeTodo };
};
