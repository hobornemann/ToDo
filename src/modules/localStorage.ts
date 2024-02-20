//------------------------------------------------------------
// LOCAL STORAGE 
//------------------------------------------------------------

import { TodoItem, TodoList } from "../types/todo";
import { createANewTodoList } from "./todoListHeader";


export const introductionHtml = `
    <h4>Welcome to the ToDo list!</h4>
    <br>
    <li class="bold">ToDo List</li>
    <li>Edit: Edit the title of the todo list by clicking the pencil icon next to it. </li>
    <li>Info: Click the info-button to see this information.</li>
    <li>Delete: Delete all todo items by clicking the trash can in the upper right hand corner.</li>
    <br>
    <li class="bold">ToDo Items</li>
    <li>Click & drag: Change priority of your todos by clicking & dragging them.</li>
    <li>Edit: Edit todo-text or title of todo list by clicking the pencil icon.</li>
    <li>Check: When you have completed the todo and want to keep it further down in the todo list, click the check-icon.</li>
    <li>Delete: Click the trash can of the todo item, if you want to delete the item.</li>                
    <br>
    `
;


export function saveTodoListToLocalStorage(todoList: TodoList): void {
    localStorage.setItem('todoList', JSON.stringify(todoList));
};


export function getTodoListFromLocalStorage(): TodoList | undefined {
    let todoList: TodoList;
    try{
        const todoListJSON = localStorage.getItem('todoList');
        if(todoListJSON){
            todoList = JSON.parse(todoListJSON);
        } else {
            todoList = createANewTodoList();
        }
        return todoList
    }
    catch(error){
        console.log("Error: ", error);
    }
}




// Define an object
const user = {
    username: 'john_doe',
    email: 'john@example.com'
};

// Store the object in Local Storage
localStorage.setItem('user', JSON.stringify(user));

// Retrieve the object from Local Storage
const storedUserJSON = localStorage.getItem('user');
const storedUser = JSON.parse(storedUserJSON);

console.log('Stored User:', storedUser);


// Check if the object exists in Local Storage
const storedUserJSON2 = localStorage.getItem('user');
if (storedUserJSON2 !== null) {
    const storedUser = JSON.parse(storedUserJSON2);
    console.log('Stored User:', storedUser);
} else {
    console.log('User does not exist in Local Storage.');
}
