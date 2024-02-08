
// TYPE
export type toDoList = {
  name: string | null;
  todoItems: todoItem[] | null;
  };
  
export type toDoItem = {
  id: string;
  status: 'ToDo'| 'Doing' | 'Done';  
  description: string | null;
  createdDateTime: Date | null;
  deadlineDateTime?: Date | null;
};

