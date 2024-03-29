//============================================================
// TODO-LIST FOOTER 
//============================================================

//-----------------------------------------
// IMPORTS
//-----------------------------------------
import { TodoList } from '../types/todo'
import { getTodoListFromLocalStorage } from './localStorage';
import { initialiseNewTodoItemAndElement } from './todoListMain';


//-----------------------------------------
// INITIALISE - RENDER HTML
//-----------------------------------------


export function renderTodoListFooterElement(todoListFooterElement: HTMLElement):void {
    try{
        let html: string = `
            <input type="text" class="add-todo-item-description-input" placeholder="Write a new todo item here...">
            <button class="info-btn button info-btn-hidden add-todo-item-info-btn"></button>
            <button class="add-todo-item-btn button">
                <img class="add-todo-item-img icon" src="/icons/plus-svgrepo-com.svg" alt="add-icon: add a todo item by clicking on this icon">
                Add
            </button>
            <div class="info-dialog">
                <h4>Ouups!</h4>
                <br>
                <li>You forgot to write your todo-text...</li>
                <br>
                <button class="close-info-dialog-btn button">&nbsp; Close &nbsp; </button>
            </div>
            <div class="info-dialog-overlay"></div>
        `;
        todoListFooterElement.innerHTML = html;
    } 
    catch(error: unknown){
        const errorMsg: string = "Error when rendering HTML for todoListFooter."
        console.error(errorMsg)
        throw new Error(errorMsg)
    }
};


//-----------------------------------------
// INITIALISE - EVENT LISTENERS  
//-----------------------------------------

export function addEventListenersToTodoListFooterElement(todoListElement: HTMLElement, todoListMainElement: HTMLElement):void {
    addEventListenerToAddTodoItemButtonInTodoListFooterElement(todoListElement, todoListMainElement);
}


//-----------------------------------------
// EVENT LISTENER - FUNCTIONS  
//-----------------------------------------

function addEventListenerToAddTodoItemButtonInTodoListFooterElement(todoListFooterElement: HTMLElement, todoListMainElement: HTMLElement):void {
    const addTodoItemButton: HTMLButtonElement = todoListFooterElement.querySelector(".add-todo-item-btn") as HTMLButtonElement;
    if(addTodoItemButton){
        addTodoItemButton.addEventListener('click', function() {
            try{
                const addTodoItemDescriptionInput: HTMLInputElement = document.querySelector(".add-todo-item-description-input") as HTMLInputElement;
                const description: string = addTodoItemDescriptionInput.value;
                if(description == ""){
                        alert("Ouups! You forgot to write your todo-text...")
                    return
                }
                const todoList: TodoList | undefined = getTodoListFromLocalStorage();
                addTodoItemDescriptionInput.value = "";  
                if(todoList){
                    initialiseNewTodoItemAndElement(todoList, todoListMainElement, description);
                } else {
                    const errorMsg: string = "The todoList cannot be retrieved (undefined)."
                    console.error(errorMsg)
                    throw new Error(errorMsg)
                }
                return description
            }
            catch(error: unknown){
                const errorMsg: string = "Error when adding creating a todo-item and/or when adding it to the todoList."
                console.error(errorMsg)
                throw new Error(errorMsg)
            }
        });
    } else {
        const errorMsg:string = "The 'add-todo-item-btn' element could not be found."
        console.error(errorMsg)
        throw new Error(errorMsg)
    }
};



