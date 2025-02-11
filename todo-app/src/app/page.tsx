"use client";
import Head from "next/head";
import TodoList from "@/components/TodoList";
import AddTodo from "@/components/AddTodo";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
  const { todos, loading, error, addTodo, removeTodo } = useTodos();

  return (
    <>
      <Head>
        <title>Todo List</title>
        <meta name="description" content="Manage your daily tasks easily" />
      </Head>
      <div className="container mx-auto p-6 max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-lg transition-all duration-300">
        <h1
          className="p-4 text-4xl font-extrabold text-center text-transparent dark:text-transparent 
  bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text 
  drop-shadow-lg animate-fade-in"
        >
          Todo List
        </h1>

        <AddTodo onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onDelete={removeTodo}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
}
