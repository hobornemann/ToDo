//============================================================
// TODO-LIST FOOTER 
//============================================================

//-----------------------------------------
// IMPORTS
//-----------------------------------------

import { TodoList } from '../types/todo'
import { getTodoListFromLocalStorage } from '../main';
import { initialiseNewTodoItemAndElement } from './todoListMain';

//-----------------------------------------
// INITIALISE - RENDER HTML
//-----------------------------------------

export function renderTodoListFooterElement(todoList: TodoList, todoListFooterElement: HTMLElement):void {
    try{
        let html = `
            <input type="text" class="add-todo-item-description-input" placeholder="Write a new todo here...">
            <button class="add-todo-item-btn button">
                <img class="add-todo-item-img icon" src="/icons/plus-svgrepo-com.svg" alt="">
                Add
            </button>
        `;
        todoListFooterElement.innerHTML = html;
    } 
    catch(error){
        const errorMsg = "Error when rendering HTML for todoListFooter."
        console.error(errorMsg)
        throw new Error(errorMsg)
    }
};


//-----------------------------------------
// INITIALISE - EVENT LISTENERS  
//-----------------------------------------

export function addEventListenersToTodoListFooterElement(todoListElement: HTMLElement, todoListMainElement: HTMLUListElement):void {
    addEventListenerToAddTodoItemButtonInTodoListFooterElement(todoListElement, todoListMainElement);
}


//-----------------------------------------
// EVENT LISTENER - FUNCTIONS  
//-----------------------------------------

function addEventListenerToAddTodoItemButtonInTodoListFooterElement(todoListFooterElement: HTMLElement, todoListMainElement: HTMLUListElement){
    const addTodoItemButton: HTMLButtonElement = todoListFooterElement.querySelector(".add-todo-item-btn") as HTMLButtonElement;
    if(addTodoItemButton){
        addTodoItemButton.addEventListener('click', function() {
            try{
                const addTodoItemDescriptionInput: HTMLInputElement = document.querySelector(".add-todo-item-description-input") as HTMLInputElement;
                const description = addTodoItemDescriptionInput.textContent || "";
                const todoList: TodoList | undefined = getTodoListFromLocalStorage();""
                addTodoItemDescriptionInput.textContent = "";
                if(todoList){
                    initialiseNewTodoItemAndElement(todoList, todoListMainElement, description);
                } else {
                    const errorMsg = "The todoList cannot be retrieved (undefined)."
                    console.error(errorMsg)
                    throw new Error(errorMsg)
                }
            }
            catch(error){
                const errorMsg = "Error when adding creating a todo-item and/or when adding it to the todoList."
                console.error(errorMsg)
                throw new Error(errorMsg)
            }
        });
    } else {
        const errorMsg = "The 'add-todo-item-btn' element could not be found."
        console.error(errorMsg)
        throw new Error(errorMsg)
    }
};



