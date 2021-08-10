import React from "react";

const Stats = ({ pokemon: { stats } }) => {
  const stat_map = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    "special-attack": "SP. Atk.",
    "special-defense": "SP. Def.",
    speed: "Speed",
  };

  const bar_color = (value) => {
    if (value < 60) return "bg-danger";
    else if (value >= 60 && value < 90) return "bg-warning";
    else return "bg-success";
  };
  const stat_rows = stats.map(({ stat: { name }, base_stat }, key) => (
    <tr key={key} className="d-flex">
      <td className="col-3">{stat_map[name]}</td>
      <td className="col-3">{base_stat}</td>
      <td className="col-6">
        <div className="progress">
          <div
            className={`progress-bar ${bar_color(base_stat)}`}
            role="progressbar"
            aria-valuenow={`${base_stat}`}
            aria-valuemin="0"
            aria-valuemax="160"
            style={{ width: `${(base_stat / 160) * 100}%` }}
          />
        </div>
      </td>
    </tr>
  ));

  return (
    <div className="container-fluid">
      <table className="table table-borderless">
        <tbody>{stat_rows}</tbody>
      </table>
    </div>
  );
};

const Charictaristics = ({
  pokemon: { types, base_experience, weight, height },
}) => {
  let types_content = "";
  types.forEach(({ type }) => {
    types_content += type.name + ",";
  });
  types_content = types_content.substr(0, types_content.length - 1);

  return (
    <table className="table table-borderless">
      <tbody>
        <tr>
          <td>type: </td>
          <td>{types_content}</td>
        </tr>
        <tr>
          <td>Base Experience:</td>
          <td>{base_experience}</td>
        </tr>

        <tr>
          <td>Height:</td>
          <td>{height}</td>
        </tr>

        <tr>
          <td>Weight:</td>
          <td>{weight}</td>
        </tr>
      </tbody>
    </table>
  );
};

const PokeCard = ({ pokemon }) => {
  return (
    <div className="card mb-3">
      <div className="row g-0">
        <div className="col-md-3">
          <div className="card-body">
            <h5 className="card-title">{pokemon.name}</h5>
            <img
              className="card-img-start"
              width="230rem"
              height="auto"
              src={pokemon.sprites.front_default}
              alt={pokemon.name}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="card-body">
            <h5 className="card-title">Charictaristics</h5>
            <Charictaristics pokemon={pokemon} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">Base States</h5>
            <Stats pokemon={pokemon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeCard;
