import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Game from './pages/Game';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
				{/* <Route exact path='/'>

				</Route> */}
        <Route path='/game'>
          <Game />
        </Route>
        <Route path='*'>
          <Redirect to='/game?tab=videos' />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
