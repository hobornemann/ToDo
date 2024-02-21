//============================================================
// TODO-LIST-MAIN 
//============================================================

import { TodoItem, TodoList } from '../types/todo'
import { v4 as uuidv4 } from 'uuid';
import { getTodoListFromLocalStorage, updateTodoListInLocalStorage } from './localStorage'


//-----------------------------------------
// INITIALISE - FROM LOCAL STORAGE
//-----------------------------------------

export function renderTodoListMainElement(todoList: TodoList, todoListMainElement: HTMLElement): void {
    try{
        if(todoListMainElement){
            let html: string = "";
            if(todoList.todoItems){
                todoList.todoItems.forEach(todoItem => {
                    html += createHtmlForNewTodoItemElement(todoItem)  
                })
            } 
            todoListMainElement.innerHTML = html;
        } else {
            const errorMessage: string = "The HTML element 'todo-list-main' (todoListMainElement) cannot be found.";
            console.error(errorMessage);
            throw new Error(errorMessage);   
        }

    }
    catch(error: unknown){
        console.error("Error: ", error);
        throw error; 
    }
};


export function addEventListenersToTodoListMainElement(todoListMainElement: HTMLElement): void {
    try {
        if (todoListMainElement) {
            addDragAndDropEventListenerToTodoListMainElement(todoListMainElement)
            addEventListenerToAllButtonOnAllTodoItemElements(todoListMainElement);
        } else {
            const errorMessage: string = "The HTML element 'todo-list-main' cannot be found.";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    } catch (error: unknown) {
        console.error("Error:", error);
        throw error; 
    }
};


function  addEventListenerToAllButtonOnAllTodoItemElements(todoListMainElement: HTMLElement): void {
    try{
        const todoItemElements: NodeListOf<HTMLElement>  = todoListMainElement.querySelectorAll(".todo-item");
        todoItemElements.forEach(todoItemElement => {
            addEventListenerToStatusButtonOnTodoItemElement(todoItemElement);
            addEventListenerToEditButtonOnTodoItemElement(todoItemElement);
            addEventListenerToCheckButtonOnTodoItemElement(todoItemElement);
            addEventListenerToDeleteButtonOnTodoItemElement(todoItemElement);
        })
    } catch (error: unknown) {
        console.error("Error:", error);
        throw error; 
    }
};


function createHtmlForNewTodoItemElement(todoItem: TodoItem): string {
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
                    <button class="status-of-todo-item-btn button">
                        <img class="status-todo-of-todo-item-img icon ${emptyCircle}" src="/icons/circle-button-joystick-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
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
            const errorMessage: string = "The input parameter todoItem is null.";
            console.error(errorMessage);
            throw new Error(errorMessage);
        }
    }   
    catch(error: unknown){
        console.error("Error:", error);
        throw error; 
    }
};


//----------------------------------------------------------------
// INITIALISE - NEW TODO-ITEM  (TS-object, localStorage, render, add eventlisteners etc) 
//----------------------------------------------------------------

export function initialiseNewTodoItemAndElement(todoList: TodoList, todoListMainElement: HTMLElement, description: string){
    // TS-object & localStorage
    const todoItem: TodoItem = createTodoItem(description);
    const updatedTodoList: TodoList = addNewTodoItemAtStartOfTodoList(todoItem, todoList);
    updateTodoListInLocalStorage(updatedTodoList);
    // update HTML/DOM
    const todoItemElement: HTMLLIElement = createNewTodoItemElement(todoItem);
    addNewTodoItemElementAtStartOfTodoListMainElement(todoItemElement, todoListMainElement)
    // add eventListeners
    addEventListenerToStatusButtonOnTodoItemElement(todoItemElement);
    addEventListenerToEditButtonOnTodoItemElement(todoItemElement);
    addEventListenerToCheckButtonOnTodoItemElement(todoItemElement);
    addEventListenerToDeleteButtonOnTodoItemElement(todoItemElement);
};


function createNewTodoItemElement(todoItem: TodoItem): HTMLLIElement {
    const todoItemElement: HTMLLIElement = document.createElement('li');
    todoItemElement.className = 'todo-item';
    todoItemElement.id = `${todoItem.id}`;
    todoItemElement.draggable = true;
    let html: string = `
        <button class="status-of-todo-item-btn button">
            <img class="status-todo-of-todo-item-img icon" src="/icons/circle-button-joystick-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
            <img class="status-done-of-todo-item-img icon hidden" src="/icons/check-mark-button-svgrepo-com.svg" alt="Status 'todo' of the to-do item">
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
    `; 
    todoItemElement.innerHTML = html;
    return todoItemElement
}


function addNewTodoItemAtStartOfTodoList(todoItem: TodoItem, todoList: TodoList): TodoList {
    try {
        const updatedTodoList: TodoList = { ...todoList };
        if (todoItem) {
            if (updatedTodoList.todoItems === null) {
                updatedTodoList.todoItems = [todoItem];
            } else {
                updatedTodoList.todoItems.unshift(todoItem);
            }
        }
        return updatedTodoList;
    } catch (error: unknown) {
        console.error("Error: ", error);
        throw error;
    }
}


function addNewTodoItemElementAtStartOfTodoListMainElement(todoItemElement: HTMLElement, todoListMainElement: HTMLElement): void{
    try{
        todoListMainElement.prepend(todoItemElement)
    }
    catch(error: unknown){
        const errorMsg: string = "Error: Either todoItemLiElement or todoListUlElement is null."
        console.error(errorMsg, error);
        throw new Error(errorMsg)
    }
};



//-----------------------------------------
// ADD EVENT-LISTENERS - BUTTONS  
//-----------------------------------------

function addEventListenerToStatusButtonOnTodoItemElement(todoItemElement: HTMLElement): void {
    toggleStatusButtonOnTodoItemElement(todoItemElement);
};

function addEventListenerToEditButtonOnTodoItemElement(todoItemElement: HTMLElement){
    try {
        const editButtonOnTodoItemElement = todoItemElement.querySelector(".edit-todo-item-btn") as HTMLButtonElement
        const todoItemDescriptionPElement = todoItemElement.querySelector('.todo-item-description-p') as HTMLElement;
        let description: string | null = todoItemDescriptionPElement.textContent;
        editButtonOnTodoItemElement.addEventListener('click', () => {
            const isEditable: boolean = todoItemDescriptionPElement?.getAttribute('contenteditable') === 'true';
            if (isEditable && todoItemDescriptionPElement) {
                todoItemDescriptionPElement.setAttribute('contenteditable', 'false');
                editButtonOnTodoItemElement.innerHTML = `<img class="todo-item-img icon"  src="/icons/pencil-svgrepo-com.svg" title="Edit description of the todo item" alt="edit-icon of the todo item">`;
                description = todoItemDescriptionPElement.textContent;
                let todoItemId: string = todoItemElement.id;
                let todoList: TodoList | undefined = getTodoListFromLocalStorage()
                if(todoList){
                    let updatedTodoList: TodoList = updateTodoItemDescriptionInTsObject(todoList, todoItemId, description);
                    updateTodoListInLocalStorage(updatedTodoList);
                }        
            } else {
                todoItemDescriptionPElement?.setAttribute('contenteditable', 'true');
                editButtonOnTodoItemElement.innerText = 'Save';
            }    
        });
    }
    catch(error: unknown){
        console.log("Error in event-listener for edit-todo-item-btn.", error);
        throw error;
    }
};

function addEventListenerToCheckButtonOnTodoItemElement(todoItemElement: HTMLElement): void {
    const checkButtonOnTodoItemElement: HTMLButtonElement = todoItemElement.querySelector(".check-todo-item-btn") as HTMLButtonElement
    try{
        checkButtonOnTodoItemElement.addEventListener('click', () => {
            const statusButtonOnTodoItemElement: HTMLButtonElement = todoItemElement.querySelector(".status-of-todo-item-btn") as HTMLButtonElement
            statusButtonOnTodoItemElement.click()
        })
    }
    catch(error: unknown){
        console.log("Error in event-listener for status-of-todo-item-btn.", error);
        throw error;
    }
};

function addEventListenerToDeleteButtonOnTodoItemElement(todoItemElement: HTMLElement): void {
    const deleteButtonOnTodoItemElement: HTMLButtonElement = todoItemElement.querySelector(".delete-todo-item-btn") as HTMLButtonElement
    try {
        deleteButtonOnTodoItemElement.addEventListener('click', () => {
            todoItemElement.remove();
            let todoItemId: string = todoItemElement.id;
            let todoList: TodoList | undefined = getTodoListFromLocalStorage()
            if(todoList){
                let updatedTodoList: TodoList = deleteTodoItemFromTsObject(todoList, todoItemId);
                updateTodoListInLocalStorage(updatedTodoList);
            }
        });
    } catch (error: unknown) {
        console.error('An error occurred while accessing elements:', error);
        throw error;
    }
};

function toggleStatusButtonOnTodoItemElement(todoItemElement: HTMLElement): void {
    try{
        const statusButtonOnTodoItemElement: HTMLButtonElement = todoItemElement.querySelector(".status-of-todo-item-btn") as HTMLButtonElement;
        const statusTodoOfTodoItemImg: HTMLImageElement = todoItemElement.querySelector(".status-todo-of-todo-item-img") as HTMLImageElement;
        const statusDoneOfTodoItemImg: HTMLImageElement = todoItemElement.querySelector(".status-done-of-todo-item-img") as HTMLImageElement;

        statusButtonOnTodoItemElement.addEventListener('click', ()=>{ 
            let newIsDoneStatus: boolean;          
            if(statusDoneOfTodoItemImg.classList.contains('hidden')){
                statusTodoOfTodoItemImg.classList.add('hidden');
                statusDoneOfTodoItemImg.classList.remove('hidden');
                newIsDoneStatus = true
            } else {
                statusTodoOfTodoItemImg.classList.remove('hidden');
                statusDoneOfTodoItemImg.classList.add('hidden');
                newIsDoneStatus = false
            }
            let todoItemId: string = todoItemElement.id
            let todoList: TodoList | undefined = getTodoListFromLocalStorage()
            if(todoList){
                let updatedTodoList: TodoList = updateTodoItemStatusInTsObject(todoList, todoItemId, newIsDoneStatus)
                updateTodoListInLocalStorage(updatedTodoList)
            }
        });    
    }
    catch(error: unknown){
        console.log("Error in eventlistener for todo-item status button", error);
        throw error;
    }
}



//----------------------------------------------------
// TS-OBJECT - CREATE, GET(READ), UPDATE, DELETE, ADD  
//----------------------------------------------------

export function createTodoItem(description: string = ''): TodoItem {
    try{
        const todoItem: TodoItem = {
            id: uuidv4(),
            isDone: false,
            description: description,
        };
        return todoItem;
    }
    catch(error: unknown){
        console.log("Error when creating todo-item", error);
        throw error;
    }
}


function updateTodoItemStatusInTsObject(todoList: TodoList, todoItemId: string, newIsDoneStatus: boolean): TodoList {
    try{
        if (!todoList.todoItems) {
            return todoList; 
        }
    
        const indexOfTodoItemToUpdate: number = todoList.todoItems.findIndex(item => item.id === todoItemId);
        if (indexOfTodoItemToUpdate === -1) {
            return todoList; 
        }
    
        const updatedTodoItems: TodoItem[] = todoList.todoItems.map(item => {
            if (item.id === todoItemId) {
                return {
                    ...item,
                    isDone: newIsDoneStatus
                };
            }
            return item;
        });
    
        return {
            ...todoList,
            todoItems: updatedTodoItems
        };
    }
    catch(error: unknown){
        console.log("Error in updating todo-item status in TS-object.", error);
        throw error;
    }

}


function updateTodoItemDescriptionInTsObject(todoList: TodoList, todoItemId: string, newDescription: string | null): TodoList {
    try{
        if (!todoList.todoItems) {
            return todoList; 
        }
    
        const indexOfTodoItemToUpdate: number = todoList.todoItems.findIndex(item => item.id === todoItemId);
        if (indexOfTodoItemToUpdate === -1) {
            return todoList; 
        }
    
        const updatedTodoItems: TodoItem[] = todoList.todoItems.map(item => {
            if (item.id === todoItemId) {
                return {
                    ...item,
                    description: newDescription
                };
            }
            return item;
        });
    
        return {
            ...todoList,
            todoItems: updatedTodoItems
        };
    }
    catch(error: unknown){
        console.log("Error in updating todo-item description in TS-object.", error);
        throw error;
    }
}



function deleteTodoItemFromTsObject(todoList: TodoList, todoItemId: string): TodoList {
    try{
        if (!todoList.todoItems) {
            return todoList; 
        }
        const indexOfTodoItemToDelete: number = todoList.todoItems.findIndex(item => item.id === todoItemId);
        if (indexOfTodoItemToDelete === -1) {
            return todoList; 
        }
        const updatedTodoItems: TodoItem[] = todoList.todoItems.filter(item => item.id !== todoItemId);
    
        return {
            ...todoList,
            todoItems: updatedTodoItems.length > 0 ? updatedTodoItems : null
        };
    }
    catch(error: unknown){
        console.log("Error when deleting todo-item from TS-object", error);
        throw error;
    }
    
}


export function deleteAllTodoItemsFromTsObject(todoList: TodoList): TodoList{
    return {
        ...todoList,
        todoItems: []
    };
};



//------------------------------------------------------------
// DRAG & DROP - EVENT-LISTENERS & FUNCTIONS
//------------------------------------------------------------

export function addDragAndDropEventListenerToTodoListMainElement(todoListMainElement:HTMLElement ): void {
    try {
        if (todoListMainElement) {
            todoListMainElement.addEventListener("dragstart", handleDragStart);
            todoListMainElement.addEventListener("dragover", handleDragOver);
            todoListMainElement.addEventListener("drop", handleDrop);
        } else {
            const errorMsg: string = "The element 'todo-list-main' cannot be found.";
            console.error(errorMsg)
            throw new Error(errorMsg);
        }
    } catch (error: unknown) {
        console.error("An error occurred:", error);
        throw error
    }
};



function handleDragStart(event: DragEvent): void {
    try {
        const target: HTMLElement = event.target as HTMLElement;
        if (target.classList.contains("todo-item")) {
            event.dataTransfer?.setData("text/plain", target.id);
        }
    } catch (error: unknown) {
        console.error("An error occurred in handleDragStart function:", error);
        throw error
    }
}


function handleDragOver(event: DragEvent): void {
    try {
        event.preventDefault();
    } catch (error: unknown) {
        console.error("An error occurred in handleDragOver function:", error);
        throw error
    }
}


function handleDrop(event: DragEvent): void {
    try {
        event.preventDefault();
        const data: string | undefined = event.dataTransfer?.getData("text/plain");
        const draggedElement: HTMLElement | null = document.getElementById(data!);
        const dropTarget: HTMLElement = event.target as HTMLElement;
        const todoItem: Element | null= dropTarget.closest(".todo-item");
        if (draggedElement && todoItem) {
            todoItem.parentNode?.insertBefore(draggedElement, todoItem);
            // TODO: Get sort-order from todoListMain and implement the order in localStorage
        }
    } catch (error: unknown) {
        console.error("An error occurred in the handleDrop function:", error);
        throw error
    }
}

