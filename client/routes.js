import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
// import app from "./app";
import SingleSpot from "./SingleSpot";
import AllSpots from "./AllSpots";

const Routes = () => {
  return (
    <Router>
      <div>
      <main className="container justify-between">
        <Route exact path="/spots" component={AllSpots} />
        <Route path="/spots/:id" component={SingleSpot} />
         </main>
      </div>
     
    </Router>
  );
};

export default Routes;
