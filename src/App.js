import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import NavBar from './components/NavBar/NavBar';
import Game from './pages/Game';
const App = () => {
  const RouteAdapter = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const adaptedHistory = React.useMemo(
      () => ({
        replace(location) {
          navigate(location, { replace: true, state: location.state });
        },
        push(location) {
          navigate(location, { replace: false, state: location.state });
        }
      }),
      [navigate]
    );
    return children({ history: adaptedHistory, location });
  };

  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={RouteAdapter}>
        <NavBar />
        <Routes>
          {/* <Route path='/game' element={<Game />}>
          <Route path=':gameId' element={<Game />} />
        </Route> */}
          <Route path='/game/:gameId' element={<Game />} />
          <Route path='*' element={<Navigate to='/game/359' replace={true} />} />
        </Routes>
      </QueryParamProvider>
    </Router>
  );
};

export default App;
