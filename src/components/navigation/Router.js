import React             from 'react';
import { Route, Switch } from 'react-router-dom';
import { HomePage  }     from '../pages/HomePage';
import { AboutPage  }    from '../pages/AboutPage';
import { NotFoundPage }  from '../pages/NotFoundPage';


const Router = (props) => {
  const { value } = props;

  return (
    <Switch>  
      <Route 
        exact path="/"
        render={(props) => {
          return <HomePage {...props} value={value}  />;
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

