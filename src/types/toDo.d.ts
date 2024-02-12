
// TYPE
export type TodoList = {
  title: string | null;
  introduction: string | null;
  todoItems: todoItem[] | null;
  };
  
export type TodoItem = {
  id: string;
  isDone: boolean;  
  description: string | null;
};

