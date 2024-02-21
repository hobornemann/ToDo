//============================================================
// TODO-LIST - (MAIN.TS)
//============================================================

//-----------------------------------------
// IMPORTS  
//-----------------------------------------
import type { TodoList } from "./types/todo.d.ts";
import { v4 as uuidv4 } from 'uuid';
import { renderTodoListHeaderElement, addEventListenersToTodoListHeaderElement} from './modules/todoListHeader.ts'
import { renderTodoListMainElement, addEventListenersToTodoListMainElement} from './modules/todoListMain.ts'
import { renderTodoListFooterElement, addEventListenersToTodoListFooterElement} from './modules/todoListFooter.ts'
import { getTodoListFromLocalStorage } from './modules/localStorage.ts'



//------------------------------------------------------------
// DOM CONTENT LOADED
//------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    try{initialiseTodoListAndElement();}
    catch(error: unknown){
        console.log("Error: ", error);
        throw error    
    }
});


//-----------------------------------------
// INITIALISE  
//-----------------------------------------

export function initialiseTodoListAndElement(): void{
    try{
        const todoList: TodoList | undefined = getTodoListFromLocalStorage();
        const todoListElement: HTMLElement = document.querySelector(".todo-list") as HTMLElement
        const todoListHeaderElement: HTMLElement = todoListElement.querySelector(".todo-list-header") as HTMLElement
        const todoListMainElement: HTMLElement = todoListElement.querySelector(".todo-list-main")  as HTMLElement
        const todoListFooterElement: HTMLElement = todoListElement.querySelector(".todo-list-footer")  as HTMLElement
            if(todoList && todoListElement && todoListHeaderElement && todoListMainElement && todoListFooterElement){
                renderTodoListElement(todoList, todoListElement);
                addEventListenersToTodoListHeaderElement(todoListElement);
                addEventListenersToTodoListMainElement(todoListElement);
                addEventListenersToTodoListFooterElement(todoListFooterElement,todoListMainElement);    
            } else {
                const errorMessage: string = "At least one of the following HTML-elements cannot be found: todo-list-header, todo-list-main and/or todo-list-footer."
                console.error(errorMessage);
                throw new Error(errorMessage)            
            }
        }
        catch(error: unknown){
            console.error("Error:", error);
            throw error; 
        }
};


function renderTodoListElement(todoList: TodoList, todoListElement: HTMLElement): void {
    try{
        const todoListHeaderElement: HTMLElement= todoListElement.querySelector(".todo-list-header") as HTMLElement
        const todoListMainElement: HTMLElement = todoListElement.querySelector(".todo-list-main")  as HTMLElement
        const todoListFooterElement: HTMLElement = todoListElement.querySelector(".todo-list-footer")  as HTMLElement
        if(todoListHeaderElement && todoListMainElement && todoListFooterElement){
            renderTodoListHeaderElement(todoListHeaderElement);
            renderTodoListMainElement(todoList, todoListMainElement);
            renderTodoListFooterElement(todoListFooterElement);
        } else {
            const errorMessage: string = "At least one of the following HTML-elements cannot be found: todo-list-header, todo-list-main and/or todo-list-footer."
            console.error(errorMessage);
            throw new Error(errorMessage)            
        }
    }
    catch(error: unknown){
        console.error("Error:", error);
        throw error; 
    }
};


//------------------------------------------------------
// TS-OBJECT - CREATE, GET (READ), UPDATE, DELETE, ADD 
//------------------------------------------------------

export function createNewTodoList(): TodoList{
    try{
        const todoList: TodoList = {
            id: uuidv4(),
            title: "",
            todoItems: [],
        }
        return todoList
    }
    catch(error: unknown){
        console.error("Error:", error);
        throw error; 
    }
};


export function updateTodoListInLocalStorage(todoList: TodoList): void {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}



