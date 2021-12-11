import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer"
import Home from "./Home";
import PlanningTools from "./PlanningTools";
import CoEmission from "./Co2Emission";
import { Divider } from "rsuite";
import Co2Explorer from "./Co2Explorer"
import Co2Reports  from "./Co2Reports";
import Map from "./Map";
export default function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/index_single_working">
            <CoEmission />
          </Route>
          <Route exact path="/plannig_doc">
            <PlanningTools />
          </Route>
          <Route exact path="/map">
            <Map />
          </Route>
          <Route exact path="/reports">
            <Co2Reports />
          </Route>
        </Switch>

        {/*  */}
        <Footer/>
      </Router>

    </div>
  );
}
