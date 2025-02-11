import { AddTodoProps } from "@/types/todo";
import { motion } from "framer-motion";
import { useState } from "react";

const AddTodo = ({ onAddTodo }: AddTodoProps) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleAddTodo = async () => {
    if (!title.trim()) {
      setError("Please enter a task");
      return;
    }

    try {
      await onAddTodo(title);
      setTitle("");
      setError(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err: any) {
      console.error("Failed to create todo:", err);
      setError("Failed to add the task. Please try again.");
    }
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="p-2 border rounded-md w-full text-black"
        aria-label="Todo task"
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex justify-between items-center mt-2">
        <button
          onClick={handleAddTodo}
          className="p-2 bg-gray-600 hover:bg-gray-900 text-white rounded-md"
        >
          Add Todo
        </button>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="ml-4 text-green-500 text-sm"
            aria-live="assertive"
          >
            Task added successfully!
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AddTodo;
