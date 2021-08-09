import React, { Component, Fragment } from "react";
import axios from "axios";
import PokeCard from "../pokemon/PokeCard";
import PokeDeck from "../pokemon/PokeDeck";

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    pokemon: null,
    abilities: null,
    searchname: "",
    pokemons: null,
  };

  async componentDidMount() {
    const baseUrl = "https://pokeapi.co/api/v2/pokemon";
    const result = await axios.get(`${baseUrl}/?limit=2000`);

    const pokemons = result.data.results.sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });

    this.setState({ pokemons });
  }

  async handleSubmit(event) {
    event.preventDefault();

    /*const baseUrl = "https://pokeapi.co/api/v2/pokemon";

    let pokemon = (await axios.get(`${baseUrl}/${this.state.searchname}`)).data;
    let abilities = [];
    for (let ability of pokemon.abilities) {
      let ability_details = (await axios.get(ability.ability.url)).data;
      abilities.push(ability_details);
    }

    this.setState({ pokemon, abilities });*/
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <form>
              <input
                placeholder="e.g Pikachu"
                name="searchname"
                required
                onChange={this.handleChange}
                value={this.state.searchname}
              />
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        <PokeDeck
          limit={10}
          name={this.state.searchname.toLowerCase()}
          pokemons={this.state.pokemons}
        />
      </Fragment>
    );
  }
}

export default Main;
