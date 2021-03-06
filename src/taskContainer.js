import React from "react";
import PointsAllocator from "./components/pointsAllocator";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PointsAllocatorBuilder from "./components/pointsAllocatorBuilder";

import Portal from "./components/currentUser/portal";

const MainTaskContainer = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route
            path="/task/:task_id/developer/:developer_id"
            render={props => <PointsAllocator {...props} />}
          />

          <Route path="/task/new">
            <PointsAllocatorBuilder />
          </Route>

          <Route path="/">
            <Portal />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default MainTaskContainer;
