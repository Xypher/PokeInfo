import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PokeAbilities from "../pokemon/Abilites";
import PokeCard from "../pokemon/PokeCard";

class Details extends Component {
  state = {
    abilites: null,
  };

  async componentDidMount() {
    let abilites = await axios.get(this.props.pokemon.url);
    abilites = abilites.map((ability) => ability.data);
    this.setState({ abilites });
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <PokeCard pokemon={this.props.pokemon} />
        </div>
        <PokeAbilities abilities={this.state.abilites} />
      </div>
    );
  }
}

export default withRouter(Details);
