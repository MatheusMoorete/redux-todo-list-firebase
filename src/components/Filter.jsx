import './Filter.scss'
import { useTodos } from '../TodosContext';


function Filter() {

    const store = useTodos();

    return (
    <>
        <div className="filters">
            <div>
                <p>Filtrar por estado</p>
                <div 
                    className="badges">
                    {/*se store.filterBy for igual a todo o filtro esta selecionado e vai ser adicionado a classe selected, caso contrário nenhuma clase será adicionada */}
                    <div 
                        className={`badge ${store.filterBy === 'todo' ? 'selected' : ''}`}
                        onClick={() => store.setFilterBy('todo')}>
                        Tarefas
                    </div>
                    <div 
                        className={`badge ${store.filterBy === 'done' ? 'selected' : ''}`}
                        onClick={() => store.setFilterBy('done')}>
                        Feito
                    </div>
                    {
                        store.filterBy && 
                        <span onClick={() => store.setFilterBy('')} className="clear">
                            Todos
                        </span>
                    }
                    
                </div>
            </div>
        </div>
    </>
    )
  }
  
  export default Filter