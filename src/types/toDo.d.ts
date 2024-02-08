
// TYPE
export type toDoList = {
  name: string | null;
  sortOrder: number;
  todoItems: todoItem[] | null;
  };
  
export type toDoItem = {
  id: string;
  sortOrder: number;
  isDone: boolean;  
  description: string | null;
  createdDateTime: Date | null;
  deadlineDateTime?: Date | null;
};

