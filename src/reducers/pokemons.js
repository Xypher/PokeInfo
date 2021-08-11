import {
  POKEMONS_LOADED,
  POKEMONS_LOADING,
  SPECIFY_POKEMON_DETAILS,
  SAVE_MAIN_PREV_STATE,
  ERASE_PREV_MAIN_STATE,
} from "../actions/actionTypes";

const initialState = {
  pokemons: null,
  loading: true,
  pokemonForDetails: null,
  mainPrevState: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POKEMONS_LOADING:
      return { ...state, loading: true };
    case POKEMONS_LOADED:
      return { ...state, loading: false, pokemons: action.payload };
    case SPECIFY_POKEMON_DETAILS:
      return { ...state, pokemonForDetails: action.payload };
    case SAVE_MAIN_PREV_STATE:
      return { ...state, mainPrevState: action.payload };
    case ERASE_PREV_MAIN_STATE:
      return { ...state, mainPrevState: null };
    default:
      return state;
  }
}
