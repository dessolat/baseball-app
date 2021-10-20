import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Game from './pages/Game';

const App = () => {
  return (
    <div className='container'>
      <Router>
        <NavBar />
        <Switch>
          <Route path='/game'>
            <Game />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
