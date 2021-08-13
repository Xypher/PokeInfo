import React, { Component } from "react";
import { connect } from "react-redux";
import { specify, savePrevState, erasePrevState } from "../../actions/pokemons";
import PokeDeck from "../pokemon/PokeDeck";
import { withRouter } from "react-router-dom";

class Main extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.queryPokemons = this.queryPokemons.bind(this);
    this.saveState = this.saveState.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  state = {
    name: "",
    queryLoading: false,
    pokeCards: [],
    limit: 8,
  };

  saveState() {
    this.props.savePrevState(this.state);
  }

  queryPokemons() {
    const { pokemons } = this.props;
    const { name, limit } = this.state;

    let pokeCards = pokemons.filter((pokemon) =>
      pokemon.name.replace(/-/g, " ").startsWith(name.toLowerCase().trim())
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
      { [event.target.name]: event.target.value, limit: 8 },
      this.queryPokemons
    );
  }

  handleScroll() {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      this.setState({ limit: this.state.limit + 8 }, this.queryPokemons);
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.props.prevState) {
      this.setState({ ...this.props.prevState });
      this.props.erasePrevState();
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  render() {
    let { queryLoading, pokeCards } = this.state;
    let { pokemonsLoading } = this.props;

    if (pokemonsLoading || queryLoading)
      return (
        <div className="container">
          <div className="row mt-5">
            <div className="col-12 text-center">
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
        <PokeDeck pokeCards={pokeCards} saveState={this.saveState} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemonsLoading: state.pokemons.loading,
  pokemons: state.pokemons.pokemons,
  prevState: state.pokemons.mainPrevState,
});

export default connect(mapStateToProps, {
  specify,
  savePrevState,
  erasePrevState,
})(withRouter(Main));
