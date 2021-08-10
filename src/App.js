import "./App.css";
import Main from "./components/page/Main";
import Details from "./components/page/Details";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import React, { Component } from "react";
import { load } from "./actions/pokemon";
import { connect } from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.load();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/details" component={Details} />
        </Switch>
      </Router>
    );
  }
}

export default App;
