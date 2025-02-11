
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export interface TodoState {
  todos: Todo[]; 
  loading: boolean; 
  error: string | null; 
  isAdding: boolean; 
}

export interface AddTodoProps {
  onAddTodo: (title: string) => Promise<void>; 
}

export interface TodoItemProps {
  todo: Todo; 
  onDelete: (id: number) => void; 
  onToggleComplete: (id: number) => void; 
}
