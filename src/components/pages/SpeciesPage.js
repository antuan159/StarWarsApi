import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import api from '../Services/api';
import helpers from '../Services/helpers';
import style from './Common.module.css';

export default class SpeciesPage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    species: null,
    isLoading: false,
  };

  async componentDidMount() {
    const { location } = this.props;
    await this.getDetail(location.pathname);
  }

  getDetail = async query => {
    this.setState({ isLoading: true });
    const species = await api.getDetail(query);
    this.setState({ isLoading: false });
    this.setState({ species });
  };

  handleLoadList = async type => {
    this.setState({ isLoading: true });
    const { species } = this.state;
    species[type] = await helpers.convertArrToObject(species, type);
    this.setState({ isLoading: false });
    this.setState({ species });
  };

  render() {
    const { species, isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {species && (
          <div>
            <p> {species.name}</p>
            <p> {species.classification}</p>
            <p> {species.designation}</p>
            <p> {species.average_height}</p>
            <p> {species.skin_colors}</p>
            <p> {species.hair_colors}</p>
            <p> {species.eye_colors}</p>
            <p> {species.average_lifespan}</p>
            <p> {species.language}</p>
            <p> {species.homeworld}</p>
            {species.films.length > 0 && (
              <div>
                <h2>films:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('films')}
                >
                  Open list films
                </button>
                <br />
                {typeof species.films[0] !== 'string' &&
                  species.films.map(index => (
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
            {species.people.length > 0 && (
              <div>
                <h2>people:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('people')}
                >
                  Open list people
                </button>
                <br />
                {typeof species.people[0] !== 'string' &&
                  species.people.map(index => (
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
            <p>{species.created}</p>
            <p>{species.edited}</p>
            <p>{species.url}</p>
          </div>
        )}
      </div>
    );
  }
}
