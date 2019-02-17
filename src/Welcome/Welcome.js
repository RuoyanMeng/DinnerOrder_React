import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

class Welcome extends Component {
  render() {
    return (
      <div className="Welcome avenir tc fw5">
        <h3 className="avenir tc fw5">Welcome to dinner planner, you can choose what you want online and we will show
          you the details of every dishes you'd like to know!</h3>
        <h3 className="avenir tc fw5">Press the button and start to plan your dinner!</h3>

        <Link to="/search" id="welcome-link" className="f4  no-underline black hover-bg-black hover-white inline-flex items-center pa2 ba border-box">
          Start Planning
        </Link>
      </div>
    );
  }
}

export default Welcome;
