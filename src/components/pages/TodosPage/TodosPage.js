import React, {  useEffect, useRef } from 'react';
import { useAppContext }             from '../../../contexts';
import { Page, Title, Spinner }      from '../../shared';



export function TodosPage(props){
  const { state: { todoState }, getTodos /*, getTodo */ } = useAppContext(); // eslint-disable-line
  const { todos, todosLoading, todosError } = todoState;
  const hasMounted                          = useRef(false);
 

  useEffect(() => {
    if (!hasMounted.current){
      hasMounted.current = true;
      getTodos();
    }
  }); 


  const renderTodos = () => {
    if (todosError){ 
      return (
        <h2 className="mb-5 text-red font-montserrat text-center">Something went wrong!</h2>
      ); 
    } 

    if (todosLoading){ 
      return (
        <Spinner 
          size={75} 
          variant="pink" 
          style={{ filter: 'drop-shadow(0px 1px 1px rgba(0,0,0,0.5))' }} 
          containerClassName="d-inline-block"
          containerStyle={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}
          useContainer={false}
        />
      ); 
    } 

    if (Array.isArray(todos) && todos.length > 0){
      return (
        <ul 
          className="w-90 mx-auto mb-5 list-group list-group-flush border border-blue border-2 rounded-3 shadow-sm overflow-hidden"
          style={{ maxWidth: 600 }}
        >
          {
            todos.map(todo => {
              return (
                <li key={todo.id} className="d-flex align-items-center list-group-item text-blue font-montserrat">
                  { todo.title }
                </li>
              )
            })
          }
        </ul> 
      );
    }

    return null;
  };


  return (
    <Page>
      <Page.Container>
        <Title as="h2" className="mb-5 text-white-3d text-center">Todos</Title>


        <div className="horizontal-ruler">
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
          <hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/><hr/>
        </div>

        { renderTodos() }
      </Page.Container>
    </Page>     
  );
}
