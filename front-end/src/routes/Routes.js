import React from "react";
import { Route as RouteWrapper } from "react-router-dom";

export default function Route({
  component: Component,
  ...rest
}) {
  return <RouteWrapper {...rest} component={Component} />;
}