import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import api from '../Services/api';
import helpers from '../Services/helpers';
import style from './Common.module.css';

export default class PeoplePage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    people: null,
    isLoading: false,
  };

  async componentDidMount() {
    const { location } = this.props;
    await this.getDetail(location.pathname);
  }

  getDetail = async query => {
    this.setState({ isLoading: true });
    const people = await api.getDetail(query);
    this.setState({ isLoading: false });
    this.setState({ people });
  };

  handleLoadList = async type => {
    this.setState({ isLoading: true });
    const { people } = this.state;
    people[type] = await helpers.convertArrToObject(people, type);
    this.setState({ isLoading: false });
    this.setState({ people });
  };

  render() {
    const { people, isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {people && (
          <div>
            <p> {people.name}</p>
            <p> {people.height}</p>
            <p> {people.mass}</p>
            <p> {people.hair_color}</p>
            <p> {people.skin_color}</p>
            <p> {people.eye_color}</p>
            <p> {people.birth_year}</p>
            <p> {people.gender}</p>
            <p> {people.homeworld}</p>

            {people.films.length > 0 && (
              <div>
                <h2>films:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('films')}
                >
                  Open list films
                </button>
                <br />
                {typeof people.films[0] !== 'string' &&
                  people.films.map(index => (
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

            {people.species.length > 0 && (
              <div>
                <h2>species:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('species')}
                >
                  Open list species
                </button>
                <br />
                {typeof people.species[0] !== 'string' &&
                  people.species.map(index => (
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

            {people.vehicles.length > 0 && (
              <div>
                <h2>vehicles:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('vehicles')}
                >
                  Open list vehicles
                </button>
                <br />
                {typeof people.vehicles[0] !== 'string' &&
                  people.vehicles.map(index => (
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

            {people.starships.length > 0 && (
              <div>
                <h2>starships:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('starships')}
                >
                  Open list starships
                </button>
                <br />
                {typeof people.starships[0] !== 'string' &&
                  people.starships.map(index => (
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
            <p>{people.created}</p>
            <p>{people.edited}</p>
            <p>{people.url}</p>
          </div>
        )}
      </div>
    );
  }
}
