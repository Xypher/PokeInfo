import axios from "axios";
import React from "react";
import PokeCard from "./PokeCard";

const PokeDeck = ({ pokemons, limit = 10, name }) => {
  if (!pokemons) {
    return (
      <div className="container text-center">
        <h2 className="h2 text-muted">No results</h2>
      </div>
    );
  }
  let rows = pokemons.filter((pokemon) =>
    pokemon.name.replace(/-/g, " ").startsWith(name.trim())
  );

  /* rows = rows
    .slice(0, Math.min(limit, rows.length))
    .map((pokemon, key) => <PokeCard url={pokemon.url} key={key} />);
*/
  rows = rows
    .slice(0, Math.min(limit, rows.length))
    .map((pokemon, key) => <PokeCard key={key} pokemon={pokemon} />);

  return <div className="container">{rows}</div>;
};

export default PokeDeck;
