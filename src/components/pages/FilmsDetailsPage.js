import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import api from '../Services/api';
import helpers from '../Services/helpers';
import style from './Common.module.css';

export default class FilmsDetailsPage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    film: null,
    isLoading: false,
  };

  async componentDidMount() {
    const { location } = this.props;
    await this.getDetail(location.state);
  }

  getDetail = async query => {
    this.setState({ isLoading: true });
    const film = await api.getDetail(query);
    this.setState({ isLoading: false });
    this.setState({ film });
  };

  handleLoadList = async type => {
    this.setState({ isLoading: true });
    const { film } = this.state;
    film[type] = await helpers.convertArrToObject(film, type);
    this.setState({ isLoading: false });
    this.setState({ film });
  };

  render() {
    const { film, isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {film && (
          <div>
            <p> {film.title}</p>
            <p> {film.episode_id}</p>
            <p> {film.opening_crawl}</p>
            <p> {film.director}</p>
            <p> {film.producer}</p>
            <p> {film.release_date}</p>
            {film.characters.length > 0 && (
              <div>
                <h2>characters:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('characters')}
                >
                  Open list characters
                </button>
                <br />
                {typeof film.characters[0] !== 'string' &&
                  film.characters.map(index => (
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

            {film.planets.length > 0 && (
              <div>
                <h2>planets:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('planets')}
                >
                  Open list planets
                </button>
                <br />
                {typeof film.planets[0] !== 'string' &&
                  film.planets.map(index => (
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

            {film.starships.length > 0 && (
              <div>
                <h2>starships:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('starships')}
                >
                  Open list starships
                </button>
                <br />
                {typeof film.starships[0] !== 'string' &&
                  film.starships.map(index => (
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

            {film.vehicles.length > 0 && (
              <div>
                <h2>vehicles:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('vehicles')}
                >
                  Open list vehicles
                </button>
                <br />
                {typeof film.vehicles[0] !== 'string' &&
                  film.vehicles.map(index => (
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

            {film.species.length > 0 && (
              <div>
                <h2>species:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('species')}
                >
                  Open list species
                </button>
                <br />
                {typeof film.species[0] !== 'string' &&
                  film.species.map(index => (
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

            <p>{film.created}</p>
            <p>{film.edited}</p>
            <p>{film.url}</p>
          </div>
        )}
      </div>
    );
  }
}
