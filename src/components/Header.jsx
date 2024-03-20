
import './Header.scss'
import { useTodos } from '../TodosContext.jsx';


function Header({ appName }) {
    
    const store = useTodos();

    return (
      <>
        <div className="header">
            <div className="container">
                <div className="header-side">
                    <h1>
                        {appName}
                    </h1>
                </div>
                <div className="header-side">
                    {/*Dessa forma o botão onclick vai mudar de false para true, e como ter argumentos é preciso colocar dentro de uma função */}
                    <button onClick={() => {store.setModalIsActive(true)}} className="btn secondary">+ Add Tarefa</button>
                </div>
            </div>
        </div>
      </>
    )
  }
  
  export default Header