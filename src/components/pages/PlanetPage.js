import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import api from '../Services/api';
import helpers from '../Services/helpers';
import style from './Common.module.css';

export default class PlanetPage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    planet: null,
    isLoading: false,
  };

  async componentDidMount() {
    const { location } = this.props;
    await this.getDetail(location.pathname);
  }

  getDetail = async query => {
    this.setState({ isLoading: true });
    const planet = await api.getDetail(query);
    this.setState({ isLoading: false });
    this.setState({ planet });
  };

  handleLoadList = async type => {
    this.setState({ isLoading: true });
    const { planet } = this.state;
    planet[type] = await helpers.convertArrToObject(planet, type);
    this.setState({ isLoading: false });
    this.setState({ planet });
  };

  render() {
    const { planet, isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {planet && (
          <div>
            <p> {planet.name}</p>
            <p> {planet.rotation_period}</p>
            <p> {planet.orbital_period}</p>
            <p> {planet.diameter}</p>
            <p> {planet.climate}</p>
            <p> {planet.gravity}</p>
            <p> {planet.terrain}</p>
            <p> {planet.surface_water}</p>
            <p> {planet.population}</p>
            <p> {planet.gravity}</p>

            {planet.residents.length > 0 && (
              <div>
                <h2>residents:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('residents')}
                >
                  Open list residents
                </button>
                <br />
                {typeof planet.residents[0] !== 'string' &&
                  planet.residents.map(index => (
                    <NavLink
                      to={index.url.slice(20)}
                      key={index.url}
                      className={style.name}
                    >
                      {index.name}
                    </NavLink>
                  ))}
              </div>
            )}

            {planet.films.length > 0 && (
              <div>
                <h2>films:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('films')}
                >
                  Open list films
                </button>
                <br />
                {typeof planet.films[0] !== 'string' &&
                  planet.films.map(index => (
                    <NavLink
                      to={{
                        pathname: index.url.slice(20),
                        state: index.url.slice(20),
                      }}
                      key={index.url}
                      className={style.name}
                    >
                      {index.title}
                    </NavLink>
                  ))}
              </div>
            )}
            <p>{planet.created}</p>
            <p>{planet.edited}</p>
            <p>{planet.url}</p>
          </div>
        )}
      </div>
    );
  }
}
