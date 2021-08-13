import React from "react";
import PokeCard from "./PokeCard";
import { Link } from "react-router-dom";
import { specify } from "../../actions/pokemons";
import { connect } from "react-redux";

const PokeDeck = ({ pokeCards, specify, saveState }) => {
  let cards = pokeCards.map((pokemon, key) => (
    <Link
      key={key}
      to={{ pathname: "details" }}
      onClick={() => {
        specify(pokemon);
        saveState();
      }}
    >
      <PokeCard pokemon={pokemon} />
    </Link>
  ));
  return (
    <div className="row mt-4">
      <div className="col-12">
        <div className="container">
          {cards.length === 0 ? (
            <div className="container">
              <div className="row mt-5">
                <div className="col-12 text-center">
                  <h1>No Results</h1>
                  <p className="text-muted">Check for misspelling errors.</p>
                </div>
              </div>
            </div>
          ) : (
            cards
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { specify })(PokeDeck);
