// Todo.jsx
import { useTodos } from '../TodosContext.jsx';
import "./Todo.scss";
import { TiDeleteOutline } from "react-icons/ti";


function Todo({ todo }) {
 const store = useTodos();

 // Função para abrir o modal de edição com os dados da tarefa selecionada
 const editTask = () => {
  store.setEditingTodo(todo);
  store.setIsEditModalActive(true); // Defina isEditModalActive como verdadeiro
  store.setModalIsActive(true); // Certifique-se de que o modal está ativo
};


 return (
    <>
      <div className={`todo ${todo.isDone ? "done" : ""}`}>

        <button onClick={editTask} className="edit">editar</button>

        <button
          onClick={() => store.dispatch({
            type: 'deleted',
            id: todo.id
          })}
          className="erase"
        >
          <TiDeleteOutline size={20} />
        </button>
        <h3>{todo.title}</h3>
        <p>{todo.description}</p>
        <div className="task-check">
          <input
            onClick={() => store.dispatch({
              type: 'toggledIsDone',
              id: todo.id
            })}
            type="checkbox"
            defaultChecked={todo.isDone}
          />
          <label>{!todo.isDone ? "Tarefa" : "Completo"}</label>
        </div>
      </div>
    </>
 );
}

export default Todo;