//============================================================
// TODO-LIST HEADER 
//============================================================


import { TodoItem, TodoList } from "../types/todo";
import { v4 as uuidv4 } from 'uuid';
import { introductionHtml } from "./localStorage";}


// CREATE, GET, UPDATE, DELETE, ADD 

export function createTodoList(): TodoList{
    const title = "";
    const todoItems: TodoItem[] = [];
    const todoList: TodoList = {
        id: uuidv4(),
        title: title,
        introductionHtml: introductionHtml,
        todoItems: todoItems,
    }
    return todoList
};

export function getTodoList(): TodoList | undefined {
    try{
        let todoList: TodoList;
        const todoListJson = localStorage.getItem('todoList');
        if(todoListJson){
            todoList = JSON.parse(todoListJson)
        } else {
            todoList = createTodoList()
        }
        return todoList
    }
    catch(error){
        console.log("Error: ", error)
    }
};

export function updateTodoList(){
//TODO:
};

/* export function deleteTodoList(){} */  // ROADMAP
/* export function addTodoListToWindow(){} */  // ROADMAP




// RENDER HTML, ADD EVENT-LISTENERS 

export function renderTodoListExclTodoItems(){

    
    renderTodoListEditButtonFunctionality();
    renderTodoListInfoButtonFunctionality();
    renderTodoListDeleteButtonFunctionality();

}

function renderTodoListEditButtonFunctionality(){
    try {
        const editTodoListHeadingBtn = document.querySelector('.edit-todo-list-heading-btn') as HTMLElement;
        const todoListHeading = document.querySelector('.todo-list-heading') as HTMLElement;

        editTodoListHeadingBtn?.addEventListener('click', () => {
            const isEditable = todoListHeading?.getAttribute('contenteditable') === 'true';

            if (isEditable) {
                todoListHeading?.setAttribute('contenteditable', 'false');
                editTodoListHeadingBtn.innerHTML = `<img class="todo-item-img icon" src="/icons/pencil-svgrepo-com.svg" title="Change the name of the todo list" alt="edit-icon: Change the name of the todo list">`;
            } else {
                todoListHeading?.setAttribute('contenteditable', 'true');
                editTodoListHeadingBtn.innerText = 'Save';
            }
        });
    } catch (error) {
        console.error('An error occurred while accessing elements:', error);
    }
};

function renderTodoListInfoButtonFunctionality(){
    
    const infoButtons = document.querySelectorAll('.info-about-todo-list-btn');
    const infoDialogs = document.querySelectorAll('.info-dialog');
    const closeInfoDialogButtons = document.querySelectorAll('.close-info-dialog-btn');
    const infoDialogOverlays = document.querySelectorAll('.info-dialog-overlay');
    
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

function renderTodoListDeleteButtonFunctionality(){
    try {
        const deleteAllTodoItemsButton = document.querySelector(".delete-all-todo-items-btn") as HTMLButtonElement;
        deleteAllTodoItemsButton?.addEventListener('click', () => {
            const todoItems: NodeListOf<HTMLElement> = document.querySelectorAll('.todo-item') as NodeListOf<HTMLElement>;
            todoItems.forEach(todoItem => {
                todoItem.remove();
            });
        });
    } catch (error) {
        console.error('An error occurred while accessing elements:', error);
    }
};

