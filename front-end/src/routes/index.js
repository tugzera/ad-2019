import React from "react";
import { Switch } from "react-router";
import Route from "./Routes";

import Navigation from "../components/Navigation";
import HomePage from "../pages/home";
import FriendPage from "../pages/friend";
import FriendCreatePage from "../pages/friend/create";
import FriendEditPage from "../pages/friend/edit";

export default function Routes() {
  return (
    <>
      <Switch>
        <Navigation>
          <Route path="/" exact component={HomePage} />
          <Route path="/friends" exact component={FriendPage} />
          <Route path="/friends/create" component={FriendCreatePage} />
          <Route path="/friends/edit/:id" component={FriendEditPage} />
        </Navigation>
      </Switch>
    </>
  );
}
