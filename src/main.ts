import { v4 as uuidv4 } from 'uuid';
import { TodoItem, TodoList } from './types/todo';
import { renderTodoItems } from './modules/todo-item.ts';
import { renderTodoListExclTodoItems } from './modules/todo-list.ts';
import { getAllTodoItemsFromLocalStorage } from './modules/localStorage.ts';


// Generate a UUID
const myUUID: string = uuidv4();
console.log(myUUID);

let todoItemId = 1;  //TODO:



//------------------------------------------------------------
// DOM CONTENT LOADED
//------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    
    
    renderTodoListExclTodoItems();
    const allTodoItems: TodoList = getAllTodoItemsFromLocalStorage();
    
    renderTodoItems(allTodoItems);
    addDragAndDropEventListenersToEachTodoItem();

});



function getTodoListFromLocalStorage(): void {

}


const addTodoItemBtn: HTMLButtonElement = document.querySelector(".add-todo-item-btn") as HTMLButtonElement;
addTodoItemBtn?.addEventListener('click', function() {
    try{
        const addTodoItemDescriptionInput: HTMLInputElement = document.querySelector(".add-todo-item-description-input") as HTMLInputElement;
        const myUUID: string = uuidv4();
        let todoItem: TodoItem = {
            id: "todo-item-"+ myUUID,
            description: addTodoItemDescriptionInput.innerText,
            isDone: false
        } 

        renderTodoItem(todoItem);
        
    }
    catch(error){

    }
});




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