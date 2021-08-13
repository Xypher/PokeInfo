import React, { Fragment } from "react";

const PokeAbilities = ({ abilities, match, location, history }) => {
  //if no abilities are yet fetched return nothing
  if (!abilities) {
    return <div></div>;
  }
  //gets the english name of the ability
  const rows = abilities.map((ability, key) => {
    let name = ability.names.filter((name) => name.language.name === "en");
    if (name.length === 0) return <Fragment />;
    name = name[0].name;

    //gets the flavor_text of the ability
    let flavor = ability.flavor_text_entries.filter(
      (effect) => effect.language.name === "en"
    );
    if (flavor.length === 0) return <Fragment />;
    flavor = flavor[0].flavor_text;

    let effect = ability.effect_entries.filter(
      (effect) => effect.language.name === "en"
    );
    if (effect.length === 0) return <Fragment />;
    effect = effect[0].effect;

    return (
      <li key={key} className="list-group-item">
        <div className="d-flex w-100 justify-content-start">
          <h5 className="h5">{name}</h5>
        </div>
        <p className="mb-1 text-left ">{flavor}</p>
        <p className="text-left text-truncate">{effect}</p>
      </li>
    );
  });

  return (
    <div className="container">
      <div className="list-group">{rows}</div>;
    </div>
  );
};

export default PokeAbilities;
