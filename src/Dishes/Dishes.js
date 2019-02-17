import React, { Component } from "react";
import { Link, HashRouter } from "react-router-dom";

// Alternative to passing the moderl as the component property,
// we can import the model instance directly
import modelInstance from "../data/DinnerModel";
import "./Dishes.css";

class DishType extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="items-center search-bar">
        <input type="text" placeholder="Search food here..." value={this.props.keyword} className="avenir"
          onChange={
            (e) => this.props.onKeywordChange(e.target.value)
          }
        />
        <select value={this.props.type} className="avenir"
          onChange={
            (e) => this.props.onTypeChange(e.target.value)
          }
        >
          <option value="all">All</option>
          <option value="main course">main course</option>
          <option value="dessert">dessert</option>
          <option value="side dish">side dish</option>
          <option value="dessert">dessert</option>
          <option value="appetizer">appetizer</option>
          <option value="salad">salad</option>
          <option value="bread">bread</option>
          <option value="breakfast">breakfast</option>
          <option value="soup">soup</option>
          <option value="beverage">beverage</option>
          <option value="sauce">sauce</option>
          <option value="drink">drink</option>
        </select>
        <a className="avenir f6 lf5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa1 ba border-box"
          onClick={
            () => { this.props.onBtnClick() }
          }
        >search</a>
      </div>
    )
  }
}

class Dishes extends Component {
  constructor(props) {
    super(props);
    // We create the state to store the various statuses
    // e.g. API data loading or error
    this.state = {
      status: "LOADING",
      dishType: "all",
      keyWord: ""
    };
  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to call the API and get the data
  componentDidMount() {
    // when data is retrieved we update the state
    // this will cause the component to re-render
    modelInstance
      .getAllDishes(this.state.dishType, this.state.keyWord)
      .then(dishes => {
        this.setState({
          status: "LOADED",
          dishes: dishes.results,
          baseUri: dishes.baseUri,
        });
      })
      .catch(() => {
        this.setState({
          status: "ERROR"
        });
      });
  }

  itemClick(i) {
    //console.log(i);
    modelInstance.setId(i);
    console.log(modelInstance.currentId);
  }

  render() {
    let dishesList = null;
    // depending on the state we either generate
    // useful message to the user or show the list
    // of returned dishes
    switch (this.state.status) {
      case "LOADING":
        dishesList = <em>Loading...</em>;
        break;
      case "LOADED":
        dishesList = this.state.dishes.map(dish => {

          return (
            <div className="card">
            <Link className="no-underline avenir tc" to={"/dishDetails"} onClick={() => this.itemClick(dish.id)} key={dish.id}>
              <div className="br2 ba dark-gray b--black-10 mw5" >
                <img src={this.state.baseUri + "/" + dish.image} className="db w-100 br2 br--top" />
                <div className="pa2 ph3-ns pb3-ns">
                  <div className="dt w-100 mt1">
                    <h1 className="f5 fw5 f4-ns mv0">{dish.title}</h1>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          )
    });
    break;
      default:
    dishesList = <b>Failed to load data, please try again</b>;
  break;
}

return (
  <div className="Dishes fl w-two-thirds w-100 w-50-m pa2 center">
    <DishType
      type={this.state.dishType}
      keyword={this.state.keyWord}
      onTypeChange={
        (type) => this.setState({ dishType: type })}
      onKeywordChange={
        (keyword) => this.setState({ keyWord: keyword })
      }
      onBtnClick={
        () => this.componentDidMount()
      }
    />
    <div className="masonry-cards">
        {dishesList}
    </div>
  </div>
);
  }
}



export default Dishes;

{/* <div className="fl w-100 w-30-ns w-50-m ph2 avenir tc">
<article className="br2 ba dark-gray b--black-10 mw5" >
  <img src={this.state.baseUri + "/" + dish.image} className="db w-100 br2 br--top" />
  <div className="pa2 ph3-ns pb3-ns">
    <div className="dt w-100 mt1">
      <h1 className="f5 fw5 f4-ns mv0">{dish.title}</h1>
    </div>
  </div>
</article>
</div> */}
