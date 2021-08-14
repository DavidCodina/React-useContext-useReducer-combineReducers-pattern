import ReactDOM         from 'react-dom';
import App              from './App';
import { AppProvider } from './contexts/AppContext';


ReactDOM.render(<AppProvider><App /></AppProvider>, document.getElementById('root'));

