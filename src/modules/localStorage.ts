//============================================================
// TODO-LIST STORAGE 
//============================================================

import { TodoList } from "../types/todo";
import { createNewTodoList } from "../main";


export function updateTodoListInLocalStorage(todoList: TodoList): void {
    localStorage.setItem('todoList', JSON.stringify(todoList));
};


/* export function getTodoListFromLocalStorage(): TodoList | undefined {
    let todoList: TodoList;
    try{
        const todoListJSON = localStorage.getItem('todoList');
        if(todoListJSON){
            todoList = JSON.parse(todoListJSON);
            return todoList
        } else {
            todoList = createNewTodoList();
            return todoList
        }
    }
    catch(error){
        console.log("Error: ", error);
    }
} */


export function getTodoListFromLocalStorage(): TodoList | undefined {
    try{
        let todoList: TodoList;
        const todoListJson = localStorage.getItem('todoList');
        //console.log("todoListJson: ",todoListJson);
        if(todoListJson){
            todoList = JSON.parse(todoListJson)
            return todoList
        } else {
            todoList = createNewTodoList()
            return todoList
        }
    }
    catch(error){
        console.log("Error: ", error)
    }
}
