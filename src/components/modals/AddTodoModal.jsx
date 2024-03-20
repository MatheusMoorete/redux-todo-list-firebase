import { useTodos } from "../../TodosContext";
import { createTodo } from '../../services/todoService';


function AddTodoModal() {
    const store = useTodos();

    async function addTaskHandler() {
        let newTodo = {
            title: document.querySelector('input[name=title]').value,
            description: document.querySelector('textarea[name=description]').value,
            isDone: false
        };
        if (newTodo.title && newTodo.description) {
            try {
                const newTodoId = await createTodo(newTodo); // Chama a função createTodo
                newTodo.id = newTodoId;
                store.dispatch({ type: 'added', newTodo });
                store.setModalIsActive(false);
            } catch (error) {
                console.error('Error adding new todo: ', error);
            }
        } else {
            alert('Por favor, adicione um título e uma tarefa.');
        }
    }

    return (
        <>
            <div className="form">
                <h3>Add a new task</h3>
                <label htmlFor="title">Title *</label>
                <input type="text" name="title" placeholder="Enter a title..." /><br />
                <label htmlFor="description">Description *</label>
                <textarea name="description" rows="4" placeholder="Enter a description..." /><br />
                <button onClick={addTaskHandler} className="btn gray">Add Task</button>
            </div>
        </>
    );
}

export default AddTodoModal;