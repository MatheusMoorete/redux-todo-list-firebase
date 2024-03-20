import { createContext, useContext, useReducer, useState, useEffect } from "react";
export const TodosContext = createContext("");
import { deleteDoc, doc } from 'firebase/firestore';

const initialTodos = [
   
  ];
  
  export function TodosProvider({children}) {

    const [todos, dispatch] = useReducer(todosReducer, loadTodosFromLocalStorage() || initialTodos);
  
    
    const [ modalIsActive, setModalIsActive] = useState(false)

    const [ filterBy, setFilterBy] = useState('')

    const [editingTodo, setEditingTodo] = useState(null);
    const [isEditModalActive, setIsEditModalActive] = useState(false);

    function filterTodos(){
        switch(filterBy){
            case 'todo':
                return todos.filter(todo => !todo.isDone);
            case 'done':
                return todos.filter(todo => todo.isDone);
            default:
                return todos;
        }
    }
  
    useEffect(() => {
      saveTodosToLocalStorage(todos);
  }, [todos]);
  function loadTodosFromLocalStorage() {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : null;
}
function saveTodosToLocalStorage(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}
    return (
      <>
        <main>
            {/*Dessa maneira que "libera" o acesso ao state de qualquer outro componente que esteja abaixo de App */}
          <TodosContext.Provider 
                value={
                    {
                      todos, 
                      dispatch,
                      modalIsActive,
                      setModalIsActive,
                      isEditModalActive, // Adicione este novo estado ao contexto
                      setIsEditModalActive, // E este método para modificá-lo
                      filterBy,
                      setFilterBy,
                      filterTodos,
                      editingTodo,
                      setEditingTodo
                    }
                }>                     
                {children}
          </TodosContext.Provider>
        </main>
      </>
    )
  }

 export function useTodos(){
    return useContext(TodosContext);
 }
  
 function todosReducer(todos, action){

    switch (action.type) {
      case 'deleted': {
        if (confirm('Você tem certeza que quer deletar essa tarefa?')) {
            // Exclua localmente
            const updatedTodos = todos.filter(todo => todo.id !== action.id);
    
            // Exclua no Firebase
            deleteTodoFromFirebase(action.id);
    
            return updatedTodos;
        }
        break;
    }
        case 'toggledIsDone' : {

            return (todos.map(todo => {
                if(todo.id === action.id){
                  todo.isDone = !todo.isDone;
                  return todo;
                } else {
                  return todo;
                }
              }));  
        }
        case 'added' : {
            {/*o Math.max vai contabilizar o tamanho do array, e utilizan o spread é possível modifica-lo, logo, ao final do array maximo sera adicionado mais 1 */}
            let newTodo = action.newTodo;
            newTodo.id =todos.length ? Math.max(...todos.map(todo => todo.id)) + 1: 1;
            {/*O spread operator (...) traz a copia do array original e depois é adicionado os outros elementos */}
            return [...todos, newTodo]; 
        }
        case 'edited': {
          return todos.map(todo => {
              if (todo.id === action.id) {
                  return { ...todo, ...action.newTodo };
              }
              return todo;
          });
      }
      
  }
  async function deleteTodoFromFirebase(todoId) {
    try {
        // Referência ao documento no Firebase
        const todoDocRef = doc(db, 'todos', todoId);
        
        // Excluir o documento
        await deleteDoc(todoDocRef);
        
        console.log('Tarefa excluída do Firebase com sucesso.');
    } catch (error) {
        console.error('Erro ao excluir tarefa do Firebase:', error);
    }
}
}