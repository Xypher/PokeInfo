import axios from "axios";
import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import PokeAbilities from "../pokemon/PokeAbilities";
import { Stats, Charictaristics } from "../pokemon/PokeCard";
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
    const { pokemonForDetails, history } = this.props;
    if (loading) return <h1>loading...</h1>;

    let images = [];
    let key = 0;
    for (const sprite in pokemonForDetails.sprites) {
      if (typeof pokemonForDetails.sprites[sprite] !== "string") continue;

      images.push(
        <div key={key} className={`carousel-item ${key === 0 ? "active" : ""}`}>
          <img
            src={pokemonForDetails.sprites[sprite]}
            className="d-block w-100"
            alt={sprite}
          />
          <div className="carousel-caption d-none d-md-block">
            <h5>{sprite.replace(/_/g, " ")}</h5>
          </div>
        </div>
      );

      key++;
    }

    return (
      <Fragment>
        <div className="container border border-1 mt-5">
          <div className="row mt-4">
            <div className="col-sm-8 col-md-3">
              <button
                className="btn btn-outline-primary "
                onClick={history.goBack}
              >
                Go Back
              </button>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div id="images-carousel" className="carousel slide">
                <div className="carousel-inner">{images}</div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#images-carousel"
                  data-bs-slide="prev"
                >
                  <span className="fas fa-arrow-left" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#images-carousel"
                  data-bs-slide="next"
                >
                  <span
                    className="fas fa-arrow-right"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-8 mt-5">
              <Charictaristics pokemon={pokemonForDetails} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Stats pokemon={pokemonForDetails} />
            </div>
          </div>
        </div>
        <div className="container mt-5">
          <h1 className="mb-4">Abilities</h1>
          <div className="row">
            <PokeAbilities abilities={abilities} />
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  pokemonForDetails: state.pokemons.pokemonForDetails,
});

export default connect(mapStateToProps)(withRouter(Details));
