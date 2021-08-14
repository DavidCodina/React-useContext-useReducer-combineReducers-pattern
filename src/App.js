import React             from 'react';
import { useAppContext } from './contexts/AppContext';
import { HashRouter }    from 'react-router-dom'; // HashRouter generally works better for GitHub, but normally use BrowserRouter.
import Router            from './components/navigation/Router';
import { Navbar }        from './components/navigation/Navbar';

import './scss/bootstrap/bootstrap-icons.css';
import './scss/bootstrap/custom-bootstrap.scss';
import './scss/App.scss';


function App(){  
  const value = useAppContext();

  
  return (
    <HashRouter>
      <header id="primary-header">
        <Navbar /> 
      </header>

      <main>
        <Router value={value} />
      </main>
    </HashRouter>
  );
}


export default App;

