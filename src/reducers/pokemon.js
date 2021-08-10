import {
  POKEMONS_LOADED,
  POKEMONS_LOADING,
  SPECIFY_POKEMON_DETAILS,
} from "../actions/actionTypes";

const initialState = {
  pokemons: null,
  loading: true,
  pokemonForDetails: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POKEMONS_LOADING:
      return { ...state, loading: true };
    case POKEMONS_LOADED:
      return { ...state, loading: false, pokemons: action.payload };
    case SPECIFY_POKEMON_DETAILS:
      return { ...state, pokemonForDetails: action.payload };
    default:
      return state;
  }
}
