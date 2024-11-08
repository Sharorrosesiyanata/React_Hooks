
import React, { createContext, useReducer } from "react";
import ToDoList from "./ToDoList";
// import { UserContext } from "./index";
// import { Button } from "react-bootstrap";

const todosinitialState = {
    todos: []
};

function todosReducer(state, action) {
    switch (action.type) {
        /*****************CREATING***********************/
        case 'add':
            // add new todo onto array
            const addedToDos = [...state.todos, action.payload]
            // spread our state and assign todos
            return { ...state, todos: addedToDos }
        /*****************READING***********************/
        case 'get':
            return { ...state, todos: action.payload }
        /*****************UPDATING***********************/
        case 'edit':
            const updatedToDo = { ...action.payload }
            //find the todo by id
            const updatedToDoIndex = state.todos.findIndex(t => t.id ===
                action.payload.id)
            //creates new array with the changed todo in between
            //update todos text
            const updatedToDos = [
                ...state.todos.slice(0, updatedToDoIndex),
                updatedToDo,
                ...state.todos.slice(updatedToDoIndex + 1)
            ];
            return { ...state, todos: updatedToDos }
        /*****************DELETING***********************/
        case 'delete':
            //filters through array removing object we choose to delete
            const filteredTodoState = state.todos.filter(todo => todo.id !==
                action.payload.id)
            return { ...state, todos: filteredTodoState }
        default:
            return todosinitialState
    }
}

export const TodosContext = createContext();

function App() {
    const [state, dispatch] = useReducer(todosReducer, todosinitialState);

    return (
        <TodosContext.Provider value={{ state, dispatch }}>
            <ToDoList />
        </TodosContext.Provider>
    );
}

//setting initial application state
// const initialState = {
//   count: 0
// };

// function reducer(state, action) {
//   //different action types update the application
//   //state in different ways
//   switch (action.type) {
//     case "increment":
//       return { count: state.count + 1 }
//     case "decrement":
//       return { count: state.count - 1 }
//     case "reset":
//       return initialState
//     default:
//       return initialState
//   }
// };

// function App() {
//   //USECONTEXT HOOK
//   //value recieved from index.js UserContext
//   // const value = useContext(UserContext);

//   //USEREDUCER HOOK
//   //dispatch calls reducer function methods
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     // <div>
//     //   Recieved, {value}
//     // </div>

//     <div>
//       Count: {state.count}
//       <br />
//       <Button onClick={() => dispatch({ type: 'increment' })}>
//         Increment
//       </Button>
//       <Button variant="secondary" onClick={() => dispatch({
//         type:
//           'decrement'
//       })}>
//         Decrement
//       </Button>
//       <Button variant="success" onClick={() => dispatch({
//         type:
//           'reset'
//       })}>
//         Reset
//       </Button>
//     </div>
//   );
// }

export default App;