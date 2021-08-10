import axios from "axios";
import React, { Component } from "react";
import PokeCard from "../pokemon/PokeCard";

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    pokemons: null,
    name: "",
  };

  async componentDidMount() {
    const baseUrl = "https://pokeapi.co/api/v2/pokemon";
    const result = await axios.get(`${baseUrl}/?limit=2000`);

    let pokemons = result.data.results.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });

    pokemons = await Promise.all(
      pokemons.map((pokemon) => axios.get(pokemon.url))
    );
    pokemons = pokemons.map((pokemon) => pokemon.data);
    this.setState({ pokemons });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    let { pokemons = null, name } = this.state;
    if (!pokemons)
      return (
        <div className="container">
          <div className="row mt-5">
            <div className="col-12">
              <div
                className="spinner-border text-muted pokemon-deck-spinner"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      );

    let pokeCards = pokemons
      .filter((pokemon) =>
        pokemon.name.replace(/-/g, " ").startsWith(name.trim())
      )
      .map((pokemon, key) => <PokeCard key={key} pokemon={pokemon} />);

    pokeCards =
      pokeCards.length !== 0 ? (
        pokeCards
      ) : (
        <div className="row mt-5">
          <div className="col-12">
            <h1>No Results</h1>
            <p className="text-muted">Check for misspelling errors.</p>
          </div>
        </div>
      );

    if (pokeCards.length === 0) {
      return (
        <div className="container">
          <div className="row mt-5">
            <div className="col-12">
              <h1>No Results</h1>
              <p className="text-muted">Check for misspelling errors.</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container mt-4">
        <form className="row form">
          <div className="col-sm-12 col-md-3">
            <label className="form-label">Pokemon Name</label>
          </div>
          <div className="col-sm-12 col-md-9">
            <input
              className="form-control"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
        </form>

        <div className="row mt-4">
          <div className="col-12">
            <div className="container">{pokeCards}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
