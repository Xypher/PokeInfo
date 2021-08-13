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

  /*save the current state of the component before moving to the details component*/
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
    /*when the process of fetching pokemons from the API is done we change the state of the componnent
    to reflect that and query the pokemons*/
    if (prevProps.pokemonsLoading && !this.props.pokemonsLoading) {
      this.setState({ queryLoading: true, pokeCards: [] }, this.queryPokemons);
    }
  }

  /*set the name to the user's input and fetches a new set of pokemons
  also reset the limit of the number of pokemons to 8*/
  handleChange(event) {
    this.setState(
      { [event.target.name]: event.target.value, limit: 8 },
      this.queryPokemons
    );
  }

  /*when the user reaches the end of the list 
  we increase the limit by 8 to fetch more pokemons*/
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
      //increase the limit of the number of pokemons by 8 and refetch
      this.setState({ limit: this.state.limit + 8 }, this.queryPokemons);
    }
  }

  componentDidMount() {
    /*adds an event listner to listen to the scrolling of the user*/
    window.addEventListener("scroll", this.handleScroll);

    /*if the user did goBack from the details component the restore the previous state and delete it*/
    if (this.props.prevState) {
      this.setState({ ...this.props.prevState });
      this.props.erasePrevState();
    }
  }

  /*remove the scrolling event listner to avoid memory leaks*/
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
  pokemonsLoading: state.pokemons.loading, //if the fetching process still happenning
  pokemons: state.pokemons.pokemons, // pokemons fetched from the API
  prevState: state.pokemons.mainPrevState, // previous state to restore if available
});

export default connect(mapStateToProps, {
  specify,
  savePrevState,
  erasePrevState,
})(withRouter(Main));
