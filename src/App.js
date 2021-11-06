import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import NavBar from './components/NavBar/NavBar';
import Game from './pages/Game';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/game' element={<Game />} />
        <Route path='*' element={<Navigate to='/game?tab=videos' replace={true} />} />
      </Routes>
    </Router>
  );
};

export default App;
