import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Game from './pages/Game';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path='/game/:tab'>
          <Game />
        </Route>
        <Route path='/game'>
          <Redirect to='/game/videos' />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
