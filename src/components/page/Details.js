import axios from "axios";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PokeAbilities from "../pokemon/PokeAbilities";
import PokeCard from "../pokemon/PokeCard";
import { connect } from "react-redux";

class Details extends Component {
  state = {
    abilities: null,
    loading: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    let { pokemonForDetails } = this.props;
    let abilities = await Promise.all(
      pokemonForDetails.abilities.map(({ ability }) => axios.get(ability.url))
    );
    abilities = abilities.map((ability) => ability.data);

    this.setState({ abilities, loading: false });
  }

  render() {
    const { abilities, loading } = this.state;
    const { pokemonForDetails } = this.props;
    if (loading) return <h1>loading...</h1>;
    console.log(abilities);
    return (
      <div className="container">
        <div className="row mt-4 mb-4">
          <PokeCard pokemon={pokemonForDetails} />
        </div>
        <div className="row">
          <PokeAbilities abilities={abilities} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemonForDetails: state.pokemons.pokemonForDetails,
});

export default connect(mapStateToProps)(withRouter(Details));
