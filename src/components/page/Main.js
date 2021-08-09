import React, { Component } from "react";
import axios from "axios";

const Stats = ({ pokemon: { stats } }) => {
  const stat_map = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "SP. Atk.",
    "special-defense": "SP. Def.",
    speed: "Speed",
  };

  const bar_color = (value) => {
    if (value < 60) return "bg-danger";
    else if (value >= 60 && value < 90) return "bg-warning";
    else return "bg-success";
  };
  const stat_rows = stats.map(({ stat: { name }, base_stat }, key) => (
    <tr key={key} className="d-flex">
      <td className="col-2">{stat_map[name]}</td>
      <td className="col-2">{base_stat}</td>
      <td className="col-7">
        <div className="progress">
          <div
            className={`progress-bar ${bar_color(base_stat)}`}
            role="progressbar"
            aria-valuenow={`${base_stat}`}
            aria-valuemin="0"
            aria-valuemax="160"
            style={{ width: `${(base_stat / 160) * 100}%` }}
          />
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="container-fluid">
      <table className="table table-borderless">
        <tbody>{stat_rows}</tbody>
      </table>
    </div>
  );
};

const Charictaristics = ({
  pokemon: { types, base_experience, weight, height },
}) => {
  let types_content = "";
  types.forEach(({ type }) => {
    types_content += type.name + ",";
  });
  types_content = types_content.substr(0, types_content.length - 1);

  return (
    <table className="table table-borderless">
      <tbody>
        <tr>
          <td>type: </td>
          <td>{types_content}</td>
        </tr>
        <tr>
          <td>Base Experience:</td>
          <td>{base_experience}</td>
        </tr>

        <tr>
          <td>Height:</td>
          <td>{height}</td>
        </tr>

        <tr>
          <td>Weight:</td>
          <td>{weight}</td>
        </tr>
      </tbody>
    </table>
  );
};

const PokeCard = ({ pokemon }) => {
  //if no pokemon is yet fetched return nothing
  if (!pokemon) {
    return <div></div>;
  }

  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <img
            className="img-fluid"
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
          />
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <h5 className="card-title">Charictaristics</h5>
            <Charictaristics pokemon={pokemon} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card-body">
            <h5 className="card-title">Base States</h5>
            <Stats pokemon={pokemon} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Abilities = ({ abilities }) => {
  //if no abilities are yet fetched return nothing
  if (!abilities) {
    return <div></div>;
  }
  const rows = abilities.map((ability) => {
    const name = ability.names.filter((name) => name.language.name === "en")[0]
      .name;

    const flavor = ability.flavor_text_entries.filter(
      (effect) => effect.language.name === "en"
    )[0].flavor_text;

    const effect = ability.effect_entries.filter(
      (effect) => effect.language.name === "en"
    )[0].effect;

    return (
      <li className="list-group-item">
        <div className="d-flex w-100 justify-content-start">
          <h5 className="h5">{name}</h5>
        </div>
        <p className="mb-1 text-left ">{flavor}</p>
        <p className="text-left text-truncate">{effect}</p>
      </li>
    );
  });

  return <div className="list-group">{rows}</div>;
};

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
  };

  async handleSubmit(event) {
    event.preventDefault();

    const baseUrl = "https://pokeapi.co/api/v2/pokemon";

    let pokemon = (await axios.get(`${baseUrl}/${this.state.searchname}`)).data;
    let abilities = [];
    for (let ability of pokemon.abilities) {
      let ability_details = (await axios.get(ability.ability.url)).data;
      abilities.push(ability_details);
    }

    this.setState({ pokemon: pokemon, abilities: abilities });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
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

        <div className="row">
          <div className="col-12">
            <div className="container">
              <PokeCard pokemon={this.state.pokemon} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Abilities abilities={this.state.abilities} />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
