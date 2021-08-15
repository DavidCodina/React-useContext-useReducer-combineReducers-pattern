import React                from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { CounterPage  }     from '../pages/CounterPage';
import { RandomNumberPage } from '../pages/RandomNumberPage';
import { TodosPage  }       from '../pages/TodosPage';
import { AboutPage  }       from '../pages/AboutPage';
import { NotFoundPage }     from '../pages/NotFoundPage';


const Router = (props) => {
  const { value } = props;

  return (
    <Switch>  
      <Route exact path="/">
        <Redirect to="/about" /> 
      </Route>


      <Route 
        exact path="/counter"
        render={(props) => {
          return <CounterPage {...props} value={value}  />;
        }}
      />


      <Route 
        exact path="/randomnumber"
        render={(props) => {
          return <RandomNumberPage {...props} value={value}  />;
        }}
      />


      <Route 
        exact path="/todos"
        render={(props) => {
          return <TodosPage {...props} value={value}  />;
        }}
      />

      
      <Route 
        exact path="/about"
        render={(props) => {
          return <AboutPage {...props} value={value}  />;
        }}
      />

      <Route component={NotFoundPage} />
    </Switch>
  )
};


export default Router;

