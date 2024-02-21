//============================================================
// TODO-LIST STORAGE 
//============================================================

import { TodoList } from "../types/todo";
import { createNewTodoList } from "../main";


export function updateTodoListInLocalStorage(todoList: TodoList): void {
    localStorage.setItem('todoList', JSON.stringify(todoList));
};


export function getTodoListFromLocalStorage(): TodoList | undefined {
    try{
        let todoList: TodoList;
        const todoListJson: string | null = localStorage.getItem('todoList');
        if(todoListJson){
            todoList = JSON.parse(todoListJson)
            return todoList
        } else {
            todoList = createNewTodoList()
            return todoList
        }
    }
    catch(error: unknown){
        console.log("Error: ", error)
    }
}
