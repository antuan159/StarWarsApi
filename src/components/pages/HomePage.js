import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { DebounceInput } from 'react-debounce-input';
import Select from 'react-dropdown-select';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import api from '../Services/api';

const options = [
  { value: 'films/', label: 'films' },
  { value: 'people/', label: 'people' },
  { value: 'planets/', label: 'planets' },
];

export default class HomePage extends Component {
  state = {
    films: [],
    isLoading: false,
    query: '',
    search: null,
    select: null,
  };

  async componentDidMount() {
    await this.fetchAllFilms();
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      this.handleSubmitInput(query);
    }
  }

  handleChangeInput = e => {
    this.setState({ query: e.target.value });
  };

  handleChangeSelect = e => {
    this.setState({ select: e[0].value });
  };

  handleSubmitInput = async () => {
    await this.fetchSearch(this.state.query, this.state.select);
  };

  fetchSearch = async (query, select) => {
    this.setState({ isLoading: true });
    const search = await api.search(`${select}?search=${query}`);
    this.setState({ isLoading: false });
    this.setState({ search });
  };

  fetchAllFilms = async () => {
    this.setState({ isLoading: true });
    const films = await api.getAllFilms();
    this.setState({ isLoading: false });
    this.setState({ films });
  };

  handleSort = () => {
    const tmp = this.state.films;
    tmp.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
    this.setState(tmp);
  };

  render() {
    const { films, isLoading, query, select, search } = this.state;
    return (
      <div>
        <button type="button" onClick={this.handleSort}>
          Sort by name
        </button>
        <h1>Films</h1>
        {isLoading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        <ul>
          {films.map(film => (
            <li key={film.url}>
              <NavLink
                to={{
                  pathname: film.url.slice(20),
                  state: film.url.slice(20),
                }}
              >
                <p>{film.title}</p>
              </NavLink>
            </li>
          ))}
        </ul>
        <p>select categories search:</p>
        <Select
          value={select}
          onChange={this.handleChangeSelect}
          options={options}
        />

        <DebounceInput
          minLength={1}
          debounceTimeout={300}
          onChange={this.handleChangeInput}
        />
        {/* <input
          type="text"
          autoComplete="off"
          placeholder="Search ..."
          value={query}
          onChange={values => this.handleChangeInput(values)}
        /> */}
        {select &&
          query !== '' &&
          search &&
          search.map(index => (
            <NavLink
              to={{
                pathname: index.url.slice(20),
                state: index.url.slice(20),
              }}
              key={index.url}
            >
              <p>{index.name || index.title}</p>
            </NavLink>
          ))}
      </div>
    );
  }
}
