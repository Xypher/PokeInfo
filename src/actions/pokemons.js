import axios from "axios";
import {
  POKEMONS_LOADING,
  POKEMONS_LOADED,
  SPECIFY_POKEMON_DETAILS,
  SAVE_MAIN_PREV_STATE,
  ERASE_PREV_MAIN_STATE,
} from "./actionTypes";

export const load = () => async (dispatch) => {
  dispatch({ type: POKEMONS_LOADING });
  const baseUrl = "https://pokeapi.co/api/v2/pokemon";
  const result = await axios.get(`${baseUrl}/?limit=2000`);

  let pokemons = result.data.results.sort((a, b) => {
    if (a.name < b.name) return -1;
    else if (a.name > b.name) return 1;
    else return 0;
  });

  pokemons = await Promise.all(
    pokemons.map((pokemon) => axios.get(pokemon.url))
  );
  pokemons = pokemons.map((pokemon) => pokemon.data);
  dispatch({ type: POKEMONS_LOADED, payload: pokemons });
};

/*specify pokemon for the details page*/
export const specify = (pokemon) => (dispatch) =>
  dispatch({ type: SPECIFY_POKEMON_DETAILS, payload: pokemon });

/*erase the Main page previous state*/
export const erasePrevState = () => (dispatch) =>
  dispatch({ type: ERASE_PREV_MAIN_STATE });

/*save the Main page's previous state before routing to the details page*/
export const savePrevState = (state) => (dispatch) =>
  dispatch({ type: SAVE_MAIN_PREV_STATE, payload: state });
