import React, { Component } from "react";
import PokeCard from "../pokemon/PokeCard";
import { connect } from "react-redux";
import { specify } from "../../actions/pokemons";
import PokeDeck from "../pokemon/PokeDeck";

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.queryPokemons = this.queryPokemons.bind(this);
  }

  state = {
    name: "",
    queryLoading: false,
    pokeCards: [],
    limit: 8,
  };

  queryPokemons() {
    const { pokemons } = this.props;
    const { name, limit } = this.state;

    let pokeCards = pokemons.filter((pokemon) =>
      pokemon.name.replace(/-/g, " ").startsWith(name.trim())
    );
    pokeCards = pokeCards.slice(0, Math.min(pokeCards.length, limit));
    this.setState({ queryLoading: false, pokeCards });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pokemonsLoading && !this.props.pokemonsLoading) {
      this.setState({ queryLoading: true, pokeCards: [] }, this.queryPokemons);
    }
  }

  handleChange(event) {
    this.setState(
      { [event.target.name]: event.target.value },
      this.queryPokemons
    );
  }

  render() {
    let { queryLoading, pokeCards } = this.state;
    let { pokemonsLoading } = this.props;

    if (pokemonsLoading || queryLoading)
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
        <PokeDeck pokeCards={pokeCards} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemonsLoading: state.pokemons.loading,
  pokemons: state.pokemons.pokemons,
});

export default connect(mapStateToProps, { specify })(Main);
