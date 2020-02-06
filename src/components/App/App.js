import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import FilmsDetailsPage from '../pages/FilmsDetailsPage';
import PeoplePage from '../pages/PeoplePage';
import PlanetPage from '../pages/PlanetPage';
import SpeciesPage from '../pages/SpeciesPage';
import StarshipsPage from '../pages/StarshipsPage';
import VehiclesPage from '../pages/VehiclesPage';
import routes from '../../routes';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={routes.HOME} component={HomePage} />
      <Route path={routes.FILMS} component={FilmsDetailsPage} />
      <Route path={routes.PEOPLE} component={PeoplePage} />
      <Route path={routes.PLANETS} component={PlanetPage} />
      <Route path={routes.SPECIES} component={SpeciesPage} />
      <Route path={routes.STARSHIPS} component={StarshipsPage} />
      <Route path={routes.VEHICLES} component={VehiclesPage} />
      <Redirect to={routes.HOME} />
    </Switch>
  </BrowserRouter>
);

export default App;
