import React from "react";

const PokeAbilities = ({ abilities, match, location, history }) => {
  //if no abilities are yet fetched return nothing
  if (!abilities) {
    return <div></div>;
  }
  const rows = abilities.map((ability, key) => {
    const name = ability.names.filter((name) => name.language.name === "en")[0]
      .name;

    const flavor = ability.flavor_text_entries.filter(
      (effect) => effect.language.name === "en"
    )[0].flavor_text;

    const effect = ability.effect_entries.filter(
      (effect) => effect.language.name === "en"
    )[0].effect;

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
