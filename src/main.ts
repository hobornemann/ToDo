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

    const todoList: TodoList | undefined = getTodoListFromLocalStorage();
    const todoListElement: HTMLElement | null = document.querySelector(".todo-list")
        if(todoList && todoListElement){
            renderTodoListElement(todoList, todoListElement);
            addEventListenersToTodoListHeaderElement(todoListElement);
            addEventListenersToTodoListMainElement(todoListElement);
            addEventListenersToTodoListFooterElement(todoListElement);    
        } else {
            console.log("getTodoList() results in undefined");
        }
};


function renderTodoListElement(todoList: TodoList, todoListElement: HTMLElement){
    try{
        const todoListHeaderElement = todoListElement.querySelector(".todo-list-header") as HTMLElement
        const todoListMainElement = todoListElement.querySelector(".todo-list-main")  as HTMLUListElement
        const todoListFooterElement = todoListElement.querySelector(".todo-list-footer")  as HTMLElement
        if(todoListHeaderElement && todoListMainElement && todoListFooterElement){
            renderTodoListHeaderElement(todoList, todoListHeaderElement);
            renderTodoListMainElement(todoList, todoListMainElement);
            renderTodoListFooterElement(todoList, todoListFooterElement);
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


export function getTodoListFromLocalStorage(): TodoList | undefined {
    try{
        let todoList: TodoList;
        const todoListJson = localStorage.getItem('todoList');
        if(todoListJson){
            todoList = JSON.parse(todoListJson)
        } else {
            todoList = createNewTodoList()
        }
        return todoList
    }
    catch(error){
        console.log("Error: ", error)
    }
};


export function updateTodoListInLocalStorage(todoList: TodoList){
    localStorage.setItem('todoList', JSON.stringify(todoList));
};

/* export function deleteTodoList(){} */  // ROADMAP
/* export function addTodoListToWindow(){} */  // ROADMAP



//-------------------------------------------------------------
// HTML/DOM ELEMENT - CREATE, GET (READ), UPDATE, DELETE, ADD 
//-------------------------------------------------------------


















//----------------------------------------------------------
// OLD CODE
//----------------------------------------------------------

/* import { v4 as uuidv4 } from 'uuid'; */

/* // TODO: delete the below code?
// Generate a UUID
const myUUID: string = uuidv4();
console.log(myUUID); */

/* const statusOfTodoItemBtn = todoItemElement.querySelector(".status-of-todo-item-btn") as HTMLButtonElement;
const statusTodoOfTodoItemImg = todoItemElement.querySelector(".status-todo-of-todo-item-img") as HTMLImageElement;
const statusDoneOfTodoItemImg = todoItemElement.querySelector(".status-done-of-todo-item-img") as HTMLImageElement;
statusOfTodoItemBtn?.addEventListener('click', ()=>{
    statusOfTodoItemBtn.classList.toggle('checked');
    statusTodoOfTodoItemImg.classList.toggle('hidden');
    statusDoneOfTodoItemImg.classList.toggle('hidden');
    //: flytta ner/upp todo-item i listan ?
}); */



/* 
if(obj.action === "Status"){
    obj.button?.addEventListener('click', ()=>{
        obj.button?.classList.toggle('checked');
        const statusTodoOfTodoItemImg = todoItemElement.querySelector(".status-todo-of-todo-item-img") as HTMLImageElement;
        const statusDoneOfTodoItemImg = todoItemElement.querySelector(".status-done-of-todo-item-img") as HTMLImageElement;
        statusTodoOfTodoItemImg.classList.toggle('hidden');
        statusDoneOfTodoItemImg.classList.toggle('hidden');
        // flytta ner/upp todo-item i listan ?
} else if (obj.action === "Edit"){
    //
} else if(obj.action === "Check"){
    //
} else if(obj.action === "Delete"){
    //       
}
 */



/* 

function initialiseTodoListMainElement(todoList: TodoList):void{
    addEventListenersToButtonsOfTodoListMain(todoList);
    addEventListenerForDragAndDropOnTodoListMain(todoList);
};

function initialiseTodoListFooterElement(todoList: TodoList):void{
    addEventListenersToButtonsOfTodoListFooter(todoList);
}; */

/* renderTodoListExclTodoItems();
renderTodoItems(allTodoItems);
addDragAndDropEventListenersToEachTodoItem();
 */

