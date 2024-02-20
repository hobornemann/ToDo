//============================================================
// TODO-LIST-MAIN 
//============================================================

import {TodoItem, TodoList} from '../types/todo'
import { v4 as uuidv4 } from 'uuid';
import {updateTodoListInLocalStorage, getTodoListFromLocalStorage} from './todoList'

//-----------------------------------------
// INITIALISE - FROM LOCAL STORAGE
//-----------------------------------------

export function renderTodoListMainElement(todoList: TodoList, todoListMainElement: HTMLUListElement):void {
    try{
        if(todoList.todoItems && todoListMainElement){
            let html: string = "";
            todoList.todoItems.forEach(todoItem => {
                html += createHtmlForNewTodoItemElement(todoItem)  
            })
            todoListMainElement.innerHTML = html;
        } else {
            const errorMessage = "Either todoList.todoItems or todoListMainElement is null.";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }
    catch(error){
        console.error("Error: ", error);
        throw error; 
    }
};


function createHtmlForNewTodoItemElement(todoItem: TodoItem): string{
    try{
        if(todoItem){
            let emptyCircle: string;
            let checkMark: string;
            if(todoItem.isDone){
                emptyCircle = "hidden"; 
                checkMark = ""; 
            } else {
                emptyCircle = "";
                checkMark = "hidden";
            }
            let html = `
                <li class="todo-item" id="${todoItem.id}" draggable="true">
                    <button class="status-of-todo-item-btn button"
                        <img class="status-todo-of-todo-item-img icon ${emptyCircle}" src="/icons/circle-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
                        <img class="status-done-of-todo-item-img icon ${checkMark}" src="/icons/check-mark-button-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
                    </button>
                    <p class="todo-item-description-p" contenteditable="false">${todoItem.description}</p>
                    <button class="edit-todo-item-btn button">
                        <img class="todo-item-img icon"  src="/icons/pencil-svgrepo-com.svg" title="Edit description of the todo item" alt="edit-icon of the todo item">
                    </button>
                    <button class="check-todo-item-btn button">
                        <img class="todo-item-img icon" src="/icons/check-svgrepo-com.svg" title="Change status of the todo item to 'DONE'" alt="check-icon of the todo item">
                    </button>
                    <button class="delete-todo-item-btn button">
                        <img class="todo-item-img icon" src="/icons/trash-svgrepo-com.svg" title="Delete the todo item" alt="delete-icon of the todo item">
                    </button>
                </li>  
            `; 
            return html;
        } else {
            const errorMessage = "The input parameter todoItem is null.";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }   
    catch(error){
        console.error("Error:", error);
        throw error; 
    }
};





export function addEventListenersToTodoListMainElement(todoListElement: HTMLElement): void {
    try {
        const todoListMainElement: HTMLElement | null = todoListElement.querySelector(".todo-list-main");
        if (todoListMainElement) {
            addEventListenerToStatusButtonInTodoListMainElement(todoListMainElement);
            addEventListenerToEditButtonInTodoListMainElement(todoListMainElement);
            addEventListenerToCheckButtonInTodoListMainElement(todoListMainElement);
            addEventListenerToDeleteButtonInTodoListMainElement(todoListMainElement);
        } else {
            const errorMessage = "The HTML element '.todo-list-main' cannot be found.";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error) {
        console.error("Error:", error);
        throw error; 
    }
};


//----------------------------------------------------------------
// INITIALISE - NEW TODO-ITEM  (render, add eventlisteners etc) 
//----------------------------------------------------------------

export function initialiseNewTodoItemAndElement(todoList: TodoList, todoListElement: HTMLUListElement, description: string){
    // object
    const todoItem: TodoItem = createTodoItem(description);
    addNewTodoItemToStartOfTodoList(todoItem, todoList);
    // storage
    updateTodoListInLocalStorage(todoList);
    // HTML-DOM

// TODO:
    
    const html = createHtmlForNewTodoItemElement(todoItem, todoListElement);
    /*  const todoItemElement: HTMLLIElement */
    addTodoItemElementToStartOfTodoListElement(todoItemElement, todoListElement);
    /* updateSortNumberOfAllTodoItemsAndElements */

};


function addNewTodoItemToStartOfTodoList(todoItem: TodoItem, todoList: TodoList){
    try{
        if(todoItem && todoList.todoItems){
            todoList.todoItems.unshift(todoItem);
        }
    }
    catch(error){
        console.error("Error: ", error);
        throw error; 
    }
}


function addTodoItemElementToStartOfTodoListElement(todoItemElement: HTMLLIElement, todoListElement: HTMLUListElement){
    try{
        todoListElement.prepend(todoItemElement)
    }
    catch(error){
        const errorMsg = "Error: Either todoItemLiElement or todoListUlElement is null."
        console.error(errorMsg, error);
        throw new Error(errorMsg)
    }
};



//-----------------------------------------
// ADD EVENT-LISTENERS - BUTTONS  
//-----------------------------------------

function addEventListenerToStatusButtonInTodoListMainElement(todoListMainElement: HTMLElement){
//TODO:
};

function addEventListenerToEditButtonInTodoListMainElement(todoListMainElement: HTMLElement){
//TODO:
};

function addEventListenerToCheckButtonInTodoListMainElement(todoListMainElement: HTMLElement){
//TODO:
};

function addEventListenerToDeleteButtonInTodoListMainElement(todoListMainElement: HTMLElement){
//TODO:
};


//-----------------------------------------
// ADD EVENT-LISTENER - DRAG & DROP  
//-----------------------------------------




//----------------------------------------------------
// TS-OBJECT - CREATE, GET(READ), UPDATE, DELETE, ADD  
//----------------------------------------------------


export function createTodoItem(description: string = ''): TodoItem {
    const todoItem: TodoItem = {
        id: uuidv4(),
        isDone: false,
        description: description,
    };
    return todoItem;
}

export function getTodoItemById(id: string): TodoItem | undefined {
 //TODO:
}

function updateTodoItemById(id: string): void {
//TODO:
}

function deleteTodoItemById(id: string): void {
//TODO:
};

function deleteAllTodoItemsOfTodoList(){
//TODO:
};

function addTodoItemToTodoList(todoItem: TodoItem){
//TODO:
};



//-------------------------------------------------------------
// HTML/DOM ELEMENT - CREATE, GET (READ), UPDATE, DELETE, ADD 
//-------------------------------------------------------------

// TODO:
export function initialiseTodoItems(todoItems:TodoItem[]):void{

    todoItems.forEach(todoItem => {
        const todoItemElement = createTodoItemElement(todoItem);
        addEventListenerToEveryButtonOnTheTodoItem(todoItemElement);
    });
    addDragAndDropEventListenerToTodoListMain();
};





function addEventListenerToEveryButtonOnTheTodoItem(todoItemElement: HTMLElement){

    const buttonObjects = [
        { button: todoItemElement.querySelector(".status-of-todo-item-btn") as HTMLButtonElement, action: "ChangeStatus"}, 
        { button: todoItemElement.querySelector(".edit-todo-item-btn") as HTMLButtonElement, action: "Edit" },
        { button: todoItemElement.querySelector(".check-todo-item-btn") as HTMLButtonElement, action: "Check" },
        { button: todoItemElement.querySelector(".delete-todo-item-btn") as HTMLButtonElement, action: "Delete" }
    ];
    
    buttonObjects.forEach(obj => {
        obj.button.addEventListener("click", (event: MouseEvent) => {
            try {
                const targetElement = event.target as HTMLElement;
                const todoItemElement: HTMLElement | null = targetElement.closest(".todo-item");
                if (todoItemElement) {
                    switch (obj.action) {
                        case "ChangeStatus":
                        case "Check":
                            try{
                                const statusTodoOfTodoItemImg = todoItemElement.querySelector(".status-todo-of-todo-item-img") as HTMLImageElement;
                                const statusDoneOfTodoItemImg = todoItemElement.querySelector(".status-done-of-todo-item-img") as HTMLImageElement;
                                obj.button?.addEventListener('click', ()=>{
                                    obj.button?.classList.toggle('checked');
                                    statusTodoOfTodoItemImg.classList.toggle('hidden');
                                    statusDoneOfTodoItemImg.classList.toggle('hidden');
                                    //TODO: flytta ner/upp todo-item i listan ?
                                });    
                            }
                            catch(error:any){
                                console.log("Error in eventlistener for todo-item status-btn", error);
                            }
                            break;
                        case "Edit":
                            try {
                                const todoItemDescriptionP = todoItemElement.querySelector('.todo-item-description-p') as HTMLElement;
                                obj.button?.addEventListener('click', () => {
                                    const isEditable = todoItemDescriptionP?.getAttribute('contenteditable') === 'true';
                        
                                    if (isEditable) {
                                        todoItemDescriptionP?.setAttribute('contenteditable', 'false');
                                        obj.button.innerHTML = `<img class="todo-item-img icon"  src="/icons/pencil-svgrepo-com.svg" title="Edit description of the todo item" alt="edit-icon of the todo item">`;
                                    } else {
                                        todoItemDescriptionP?.setAttribute('contenteditable', 'true');
                                        obj.button.innerText = 'Save';
                                    }
                                });
                            } catch (error) {
                                console.error('An error occurred while accessing elements:', error);
                            }
                            break; 
                        case "Delete":
                            try {
                                obj.button?.addEventListener('click', () => {
                                    todoItemElement.remove();
                                });
                            } catch (error) {
                                console.error('An error occurred while accessing elements:', error);
                            }
                            break; 
                        default:
                            console.log("Error in eventListeners in renderTodoItem function");
                    }    
                } else {
                    throw new Error("Parent todo-item not found in renderTodoItem function.");
                }
            } catch (error:any) {
                console.error("An error occurred:", error);
            }
        });
    });
};





//------------------------------------------------------------
// ADD EVENT-LISTENER - DRAG & DROP
//------------------------------------------------------------

export function addDragAndDropEventListenerToTodoListMainElement(){
    const todoListMain: HTMLUListElement | null = document.querySelector(".todo-list-main");
    console.log("todoListMain",todoListMain)
    try {
        if (todoListMain) {
        // Add event listeners for drag events on todo-list-main
        todoListMain.addEventListener("dragstart", handleDragStart);
        todoListMain.addEventListener("dragover", handleDragOver);
        todoListMain.addEventListener("drop", handleDrop);
        } else {
        throw new Error("Todo list main element not found.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};


//------------------------------------------------------------
// DRAG & DROP - FUNCTIONS: DRAG-START, DRAG-OVER, DRAG-DROP
//------------------------------------------------------------

function handleDragStart(event: DragEvent) {
    try {
        const target: HTMLElement = event.target as HTMLElement;
        if (target.classList.contains("todo-item")) {
            event.dataTransfer?.setData("text/plain", target.id);
        }
    } catch (error) {
        console.error("An error occurred in handleDragStart function:", error);
    }
}


function handleDragOver(event: DragEvent) {
    try {
        event.preventDefault();
    } catch (error) {
        console.error("An error occurred in handleDragOver function:", error);
    }
}


function handleDrop(event: DragEvent): void {
    try {
        event.preventDefault();
        const data = event.dataTransfer?.getData("text/plain");
        const draggedElement = document.getElementById(data!);
        const dropTarget = event.target as HTMLElement;
        const todoItem = dropTarget.closest(".todo-item");
        if (draggedElement && todoItem) {
            todoItem.parentNode?.insertBefore(draggedElement, todoItem);
        }
    } catch (error: any) {
        console.error("An error occurred in the handleDrop function:", error);
    }
}
