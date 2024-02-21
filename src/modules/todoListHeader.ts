//============================================================
// TODO-LIST HEADER 
//============================================================

//-----------------------------------------
// IMPORTS   
//-----------------------------------------
import { getTodoListFromLocalStorage, updateTodoListInLocalStorage } from './localStorage'
import { TodoList } from '../types/todo';
import { deleteAllTodoItemsFromTsObject } from './todoListMain';


//-----------------------------------------
// INITIALISE - RENDER HTML/DOM-ELEMENT   
//-----------------------------------------

export function renderTodoListHeaderElement(todoListHeaderElement: HTMLElement):void {
    let todoList: TodoList | undefined = getTodoListFromLocalStorage();
    let title: string = todoList?.title || "My Todo List"
    let html: string = `
        <h3 class="todo-list-heading" contenteditable="false">${title}</h3>
            <button class="edit-todo-list-heading-btn button">
                <img class="todo-item-img icon" src="/icons/pencil-svgrepo-com.svg" title="Change the name of the todo list" alt="edit-icon: Change the name of the todo list">
            </button>
            <button class="info-btn button">
                <img class="todo-item-img icon" src="/icons/info-borderless-svgrepo-com.svg" title="Intro to the todo list" alt="info-icon: Intro to the todo list">
            </button>
            <div class="info-dialog">
                <h4>Welcome to the ToDo list!</h4>
                <br>
                <li class="bold">ToDo List</li>
                <li>Edit: Edit the title of the todo list by clicking the pencil icon next to it. </li>
                <li>Info: Click the info-button to see this information.</li>
                <li>Delete: Delete all todo items by clicking the trash can in the upper right hand corner.</li>
                <br>
                <li class="bold">ToDo Items</li>
                <li>Click & drag: Change priority of your todos by clicking & dragging them.</li>
                <li>Edit: Edit todo-text by clicking the pencil icon.</li>
                <li>Check: When you have completed the todo item and want to keep it further down in the todo list, click the check-icon.</li>
                <li>Delete: Click the trash can of the todo item, if you want to delete the item.</li>                
                <br>
                <button class="close-info-dialog-btn button">&nbsp; Close &nbsp; </button>
            </div>
            <div class="info-dialog-overlay"></div>
            <button class="delete-all-todo-items-btn button">
                <img class="delete-all-todo-items-img icon" src="/icons/trash-svgrepo-com.svg" title="Deletes all items in the todo list" alt="delete-icon: Deletes all items in the todo list" >
            </button>
    `;
    todoListHeaderElement.innerHTML = html;
}


//-----------------------------------------
// INITIALISE - ADD EVENT-LISTENERS   
//-----------------------------------------

export function addEventListenersToTodoListHeaderElement(todoListElement: HTMLElement): void {  
    addEventListenerToEditButtonInTodoListHeaderElement(todoListElement);
    addEventListenerToInfoButtonInTodoListHeaderElement(todoListElement);
    addEventListenerToDeleteAllTodoItemsButtonInTodoListHeaderElement(todoListElement);
};


//-----------------------------------------
// ADD EVENT-LISTENER - FUNCTIONS 
//-----------------------------------------


function addEventListenerToEditButtonInTodoListHeaderElement(todoListElement: HTMLElement): void {
    
    try {
        const editTodoListHeadingBtn: HTMLButtonElement = todoListElement.querySelector('.edit-todo-list-heading-btn') as HTMLButtonElement;
        const todoListHeading: HTMLElement = todoListElement.querySelector('.todo-list-heading') as HTMLElement;
        let title: string = "";
        
        editTodoListHeadingBtn.addEventListener('click', () => {
            const isEditable: boolean = todoListHeading?.getAttribute('contenteditable') === 'true';
            if (isEditable && todoListHeading) {
                title = todoListHeading.textContent || "";
                todoListHeading.setAttribute('contenteditable', 'false');
                editTodoListHeadingBtn.innerHTML = `<img class="todo-item-img icon" src="/icons/pencil-svgrepo-com.svg" title="Change the name of the todo list" alt="edit-icon: Change the name of the todo list">`;
                let todoList: TodoList | undefined = getTodoListFromLocalStorage()
                if(todoList){
                    let updatedTodoList: TodoList = updateTodoListTitleInTsObject(todoList, title);
                    updateTodoListInLocalStorage(updatedTodoList);
                }
            } else {
                todoListHeading?.setAttribute('contenteditable', 'true');
                editTodoListHeadingBtn.innerText = 'Save';
            }
        });
    } catch (error: unknown) {
        console.error('An error occurred while accessing elements:', error);
    }
};


function addEventListenerToInfoButtonInTodoListHeaderElement(todoListElement: HTMLElement): void {
    
    const infoButtons: NodeListOf<HTMLButtonElement> = todoListElement.querySelectorAll('.info-btn');
    const infoDialogs: NodeListOf<Element> = todoListElement.querySelectorAll('.info-dialog');
    const closeInfoDialogButtons: NodeListOf<HTMLButtonElement> = todoListElement.querySelectorAll('.close-info-dialog-btn');
    const infoDialogOverlays: NodeListOf<Element> = todoListElement.querySelectorAll('.info-dialog-overlay');
    
    infoButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            (infoDialogs[index] as HTMLElement).style.display = 'block';
            (infoDialogOverlays[index] as HTMLElement).style.display = 'block';
        });
    });
    
    closeInfoDialogButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            (infoDialogs[index] as HTMLElement).style.display = 'none';
            (infoDialogOverlays[index] as HTMLElement).style.display = 'none';
        });
    });
};


function addEventListenerToDeleteAllTodoItemsButtonInTodoListHeaderElement(todoListElement: HTMLElement): void {
    try {
        const deleteAllTodoItemsButton = todoListElement.querySelector(".delete-all-todo-items-btn") as HTMLButtonElement;
        if(deleteAllTodoItemsButton){
            deleteAllTodoItemsButton.addEventListener('click', () => {
                const todoItemElements: NodeListOf<HTMLElement> = todoListElement.querySelectorAll('.todo-item') as NodeListOf<HTMLElement>;
                todoItemElements.forEach(todoItemElement => {
                    todoItemElement.remove();
                });
                let todoList: TodoList | undefined = getTodoListFromLocalStorage()
                
                if(todoList){
                    let updatedTodoList: TodoList = deleteAllTodoItemsFromTsObject(todoList);
                    updateTodoListInLocalStorage(updatedTodoList);
                }
            });
        }
    } catch (error: unknown) {
        console.error('An error occurred while accessing elements:', error);
    }
};


function updateTodoListTitleInTsObject(todoList: TodoList, newTitle: string): TodoList {
    return {...todoList, title: newTitle}; 
}