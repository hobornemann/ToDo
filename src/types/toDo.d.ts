
// TYPE
export type TodoList = {
  id: string;
  title: string | null;
  todoItems: TodoItem[] | null;
  };
  
export type TodoItem = {
  id: string;
  isDone: boolean;  
  description: string | null;
};




