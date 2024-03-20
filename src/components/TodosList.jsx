import { useTodos } from '../TodosContext.jsx';
import Todo from './Todo.jsx';


function TodosList() {

  const store = useTodos();

  return (
    <>
        <div className="todos"> 
          
          {store.filterTodos().length ? store.filterTodos().map(todo => 
                <Todo
                  todo={todo}
                  key={todo.id}
              />
            ) : 'Nenhuma tarefa apresentada. Tente mudar o filtro ou adicione uma nova tarefa'
          }

        </div>
    </>
  )
}

export default TodosList