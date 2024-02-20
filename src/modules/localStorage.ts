//============================================================
// TODO-LIST STORAGE 
//============================================================

import { TodoList } from "../types/todo";
import { createNewTodoList } from "../main";


export function updateTodoListInLocalStorage(todoList: TodoList): void {
    localStorage.setItem('todoList', JSON.stringify(todoList));
};


export function getTodoListFromLocalStorage(): TodoList | undefined {
    let todoList: TodoList;
    try{
        const todoListJSON = localStorage.getItem('todoList');
        if(todoListJSON){
            todoList = JSON.parse(todoListJSON);
        } else {
            todoList = createNewTodoList();
        }
        return todoList
    }
    catch(error){
        console.log("Error: ", error);
    }
}



