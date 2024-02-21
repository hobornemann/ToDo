//============================================================
// TODO-LIST 
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
    catch(error){console.log("Error: ", error);}
});


//-----------------------------------------
// INITIALISE  
//-----------------------------------------

export function initialiseTodoListAndElement(){
    try{
        const todoList: TodoList | undefined = getTodoListFromLocalStorage();
        const todoListElement = document.querySelector(".todo-list") as HTMLElement
        const todoListHeaderElement = todoListElement.querySelector(".todo-list-header") as HTMLElement
        const todoListMainElement = todoListElement.querySelector(".todo-list-main")  as HTMLElement
        const todoListFooterElement = todoListElement.querySelector(".todo-list-footer")  as HTMLElement
            if(todoList && todoListElement && todoListHeaderElement && todoListMainElement && todoListFooterElement){
                renderTodoListElement(todoList, todoListElement);
                addEventListenersToTodoListHeaderElement(todoListElement);
                addEventListenersToTodoListMainElement(todoListElement);
                addEventListenersToTodoListFooterElement(todoListFooterElement,todoListMainElement);    
            } else {
                const errorMessage = "At least one of the following HTML-elements cannot be found: todo-list-header, todo-list-main and/or todo-list-footer."
                console.error(errorMessage);
                throw new Error(errorMessage)            
            }
        }
        catch(error){
            console.error("Error:", error);
            throw error; 
        }
};


function renderTodoListElement(todoList: TodoList, todoListElement: HTMLElement){
    try{
        const todoListHeaderElement = todoListElement.querySelector(".todo-list-header") as HTMLElement
        const todoListMainElement = todoListElement.querySelector(".todo-list-main")  as HTMLElement
        const todoListFooterElement = todoListElement.querySelector(".todo-list-footer")  as HTMLElement
        if(todoListHeaderElement && todoListMainElement && todoListFooterElement){
            renderTodoListHeaderElement(todoListHeaderElement);
            renderTodoListMainElement(todoList, todoListMainElement);
            renderTodoListFooterElement(todoListFooterElement);
        } else {
            const errorMessage = "At least one of the following HTML-elements cannot be found: todo-list-header, todo-list-main and/or todo-list-footer."
            console.error(errorMessage);
            throw new Error(errorMessage)            
        }
    }
    catch(error){
        console.error("Error:", error);
        throw error; 
    }
};


//------------------------------------------------------
// TS-OBJECT - CREATE, GET (READ), UPDATE, DELETE, ADD 
//------------------------------------------------------

export function createNewTodoList(): TodoList{
    const todoList: TodoList = {
        id: uuidv4(),
        title: "",
        todoItems: [],
    }
    return todoList
};


/* export function getTodoListFromLocalStorage(): TodoList | undefined {
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
} */


export function updateTodoListInLocalStorage(todoList: TodoList){
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

/* export function deleteTodoList(){} */  // ROADMAP
/* export function addTodoListToWindow(){} */  // ROADMAP


