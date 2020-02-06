import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import api from '../Services/api';
import helpers from '../Services/helpers';
import style from './Common.module.css';

export default class VehiclesPage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
  };

  state = {
    vehicles: null,
    isLoading: false,
  };

  async componentDidMount() {
    const { location } = this.props;
    await this.getDetail(location.pathname);
  }

  getDetail = async query => {
    this.setState({ isLoading: true });
    const vehicles = await api.getDetail(query);
    this.setState({ isLoading: false });
    this.setState({ vehicles });
  };

  handleLoadList = async type => {
    this.setState({ isLoading: true });
    const { vehicles } = this.state;
    vehicles[type] = await helpers.convertArrToObject(vehicles, type);
    this.setState({ isLoading: false });
    this.setState({ vehicles });
  };

  render() {
    const { vehicles, isLoading } = this.state;
    return (
      <div>
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {vehicles && (
          <div>
            <p> {vehicles.name}</p>
            <p> {vehicles.model}</p>
            <p> {vehicles.manufacturer}</p>
            <p> {vehicles.cost_in_credits}</p>
            <p> {vehicles.length}</p>
            <p> {vehicles.max_atmosphering_speed}</p>
            <p> {vehicles.crew}</p>
            <p> {vehicles.passengers}</p>
            <p> {vehicles.cargo_capacity}</p>
            <p> {vehicles.consumables}</p>
            <p> {vehicles.vehicle_class}</p>
            {vehicles.films.length > 0 && (
              <div>
                <h2>films:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('films')}
                >
                  Open list films
                </button>
                <br />
                {typeof vehicles.films[0] !== 'string' &&
                  vehicles.films.map(index => (
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
            {vehicles.pilots.length > 0 && (
              <div>
                <h2>pilots:</h2>
                <button
                  type="button"
                  onClick={() => this.handleLoadList('pilots')}
                >
                  Open list pilots
                </button>
                <br />
                {typeof vehicles.pilots[0] !== 'string' &&
                  vehicles.pilots.map(index => (
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
            <p>{vehicles.created}</p>
            <p>{vehicles.edited}</p>
            <p>{vehicles.url}</p>
          </div>
        )}
      </div>
    );
  }
}
