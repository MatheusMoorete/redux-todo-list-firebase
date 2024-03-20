import { useTodos } from "../../TodosContext";
import ModalCloseButton from "./ModalCloseButton";
import ModalWindow from './ModalWindow';
import { updateTodo } from '../../services/todoService';

const EditTodoModal = () => {
    const store = useTodos();

    const handleEdit = async () => {
        const title = document.querySelector('input[name=title]').value;
        const description = document.querySelector('textarea[name=description]').value;

        if (title && description) {
            const updatedTodo = { title, description };

            try {
                await updateTodo(store.editingTodo.id, updatedTodo); // Chama a função updateTodo
                store.dispatch({ type: 'edited', id: store.editingTodo.id, newTodo: updatedTodo });
                store.setModalIsActive(false);
                store.setIsEditModalActive(false);
            } catch (error) {
                console.error('Error updating todo: ', error);
            }
        } else {
            alert('Por favor, preencha o título e a descrição.');
        }
    };

    return (
        <ModalWindow >
            <ModalCloseButton />
            <div className="form">
                <h3>Editar Tarefa</h3>
                <label htmlFor="title">Título *</label>
                <input type="text" name="title" defaultValue={store.editingTodo?.title} />
                <label htmlFor="description">Descrição *</label>
                <textarea name="description" rows="4" defaultValue={store.editingTodo?.description} />
                <button onClick={handleEdit} className="btn gray">Salvar Alterações</button>
            </div>
        </ModalWindow>
    );
};

export default EditTodoModal;
