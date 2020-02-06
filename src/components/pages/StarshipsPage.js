import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import api from '../Services/api';
import helpers from '../Services/helpers';
import style from './Common.module.css';

export default class StarshipsPage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    starships: null,
    isLoading: false,
  };

  async componentDidMount() {
    const { location } = this.props;
    await this.getDetail(location.pathname);
  }

  getDetail = async query => {
    this.setState({ isLoading: true });
    const starships = await api.getDetail(query);
    this.setState({ isLoading: false });
    this.setState({ starships });
  };

  handleLoadList = async type => {
    this.setState({ isLoading: true });
    const { starships } = this.state;
    starships[type] = await helpers.convertArrToObject(starships, type);
    this.setState({ isLoading: false });
    this.setState({ starships });
  };

  render() {
    const { starships, isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {starships && (
          <div>
            <p> {starships.name}</p>
            <p> {starships.model}</p>
            <p> {starships.manufacturer}</p>
            <p> {starships.cost_in_credits}</p>
            <p> {starships.length}</p>
            <p> {starships.max_atmosphering_speed}</p>
            <p> {starships.crew}</p>
            <p> {starships.passengers}</p>
            <p> {starships.cargo_capacity}</p>
            <p> {starships.consumables}</p>
            <p> {starships.hyperdrive_rating}</p>
            <p> {starships.MGLT}</p>
            <p> {starships.starship_class}</p>

            {starships.pilots.length > 0 && (
              <div>
                <h2>pilots:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('pilots')}
                >
                  Open list pilots
                </button>
                <br />
                {typeof starships.pilots[0] !== 'string' &&
                  starships.pilots.map(index => (
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

            {starships.films.length > 0 && (
              <div>
                <h2>films:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('films')}
                >
                  Open list films
                </button>
                <br />
                {typeof starships.films[0] !== 'string' &&
                  starships.films.map(index => (
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
            <p>{starships.created}</p>
            <p>{starships.edited}</p>
            <p>{starships.url}</p>
          </div>
        )}
      </div>
    );
  }
}
