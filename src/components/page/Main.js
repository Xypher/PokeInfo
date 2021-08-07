import React, { Component } from "react";
import axios from "axios";

class Main extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    pokemon: null,
    searchname: "",
  };

  async handleSubmit(event) {
    event.preventDefault();

    const baseUrl = "https://pokeapi.co/api/v2/pokemon";

    console.log("started the query");
    let data = await axios.get(`${baseUrl}/${this.state.searchname}`);
    console.log("passed");
    console.log(JSON.stringify(data));
    this.setState({ pokemon: data });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <input
            placeholder="e.g Pikachu"
            name="searchname"
            required
            onChange={this.handleChange}
            value={this.state.searchname}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>

        <div className="row">
          <textarea
            value={this.state.pokemon ? JSON.stringify(this.state.pokemon) : ""}
          />
        </div>
      </div>
    );
  }
}
export default Main;
