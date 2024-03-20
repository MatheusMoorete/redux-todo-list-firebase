
import Filter from '../components/Filter.jsx';
import TodosList from '../components/TodosList.jsx';
import ModalWindow from '../components/modals/ModalWindow.jsx';
import AddTodoModal from './../components/modals/AddTodoModal';
import { useTodos } from '../TodosContext.jsx';
import EditTodoModal from '../components/modals/EditTodoModal.jsx';



function Home() {
    const store = useTodos();

    return (
        <>
            {store.modalIsActive && !store.isEditModalActive && 
                <ModalWindow>
                    <AddTodoModal/>
                </ModalWindow>
            }
            {store.isEditModalActive && 
                <ModalWindow>
                    <EditTodoModal/>
                </ModalWindow>
            }

            <div className="container">
                <Filter />
                <TodosList />
            </div>
        </>
    );
}
  
  export default Home
