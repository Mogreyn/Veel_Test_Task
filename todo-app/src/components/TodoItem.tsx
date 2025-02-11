"use client";

import { Todo } from "@/types/todo";
import { useState } from "react";

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
}

const TodoItem = ({ todo, onDelete }: TodoItemProps) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(todo.id);
    setIsDeleting(false);
  };

  return (
    <div className="border p-4 mb-2 rounded-md flex justify-between max-w-3xs hover:bg-gray-600">
      <span className={todo.completed ? "line-through text-gray-500" : ""}>
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`text-red-500 hover:text-red-700 bg-gray-600 hover:bg-gray-300 rounded-md p-2 ${
          isDeleting ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </button>
    </div>
  );
};

export default TodoItem;
