import React from "react";
import { Switch } from "react-router";
import Route from "./Route";

import Home from '../pages/home'
import Friend from '../pages/friend'
import Game from '../pages/game'

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/friends" exact component={Friend} />
      <Route path="/game" exact component={Game} />
    </Switch>
  );
}
