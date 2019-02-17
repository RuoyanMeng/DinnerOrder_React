import React, { Component } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Dish from "../Dish/Dish";
import "./DishDetails.css";

class DishDetails extends Component {
    render() {
      return (
        <div className="DishDetails flex flex-wrap justify-center">
          {/* <h2>This is the DishDetails screen</h2> */}
  
          {/* We pass the model as property to the Sidebar component */}
          <Sidebar model={this.props.model} />
          <Dish model={this.props.model}/>
        </div>
      );
    }
  }
  
  export default DishDetails;
  