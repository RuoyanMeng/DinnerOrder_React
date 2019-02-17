import React, { Component } from "react";
import { Route} from "react-router-dom";

import Welcome from "./Welcome/Welcome";
import modelInstance from "./data/DinnerModel";
import SelectDish from "./SelectDish/SelectDish";
import DishDetails from "./DishDetails/DishDetails";
import DishCheckout from "./DishCheckout/DishCheckout";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Dinner Planner"
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header light-red avenir tc f4 w-100 pa2">
          <h1 className="App-title  tc ">{this.state.title}</h1>
        </header>
        {/* We rended diffrent component based on the path */}
        <Route exact path="/" component={Welcome} />
        <Route 
          path="/search"
          render={() => <SelectDish  model={modelInstance} />}
        />
        
        <Route path="/dishDetails"
          render={() => <DishDetails model={modelInstance} />}
        />

        <Route path="/menuOverview"
          render={()=> <DishCheckout model={modelInstance} />}
        />
        
      
      </div>
    );
  }
}

export default App;
