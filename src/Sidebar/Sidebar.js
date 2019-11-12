import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import modelInstance from "../data/DinnerModel";

var storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove(key) {
    return localStorage.removeItem(key)
  }
}


class Sidebar extends Component {
  constructor(props) {
    super(props);

    // we put on state the properties we want to use and modify in the component
    this.state = {
      display_name: 'block',
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDish: this.props.model.selectedDish
    };


  }

  // this methods is called by React lifecycle when the
  // component is actually shown to the user (mounted to DOM)
  // that's a good place to setup model observer
  componentDidMount() {
    let numberOfGuests = storage.get('numberOfGuests');
    let selectedDish = storage.get('selectedDish');
    if (numberOfGuests && selectedDish) {
      modelInstance.setNumberOfGuests(numberOfGuests);
      modelInstance.setSelected(selectedDish);
      this.setState({
        numberOfGuests: numberOfGuests,
        selectedDish: selectedDish
      })
    }
    //console.log(modelInstance.selectedDish)
    this.props.model.addObserver(this);
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
    this.setState({
      numberOfGuests: this.props.model.getNumberOfGuests(),
      selectedDish: this.props.model.selectedDish
    });
  }

  // our handler for the input's on change event
  onNumberOfGuestsChanged = e => {
    this.props.model.setNumberOfGuests(e.target.value);
    storage.set('numberOfGuests', e.target.value);
  };

  removeMenuClick(id) {
    modelInstance.removeDishFromMenu(id)
    storage.set('selectedDish', modelInstance.selectedDish);
  }

  display_name() {
    if (this.state.display_name == 'none') {
        this.setState({
            display_name: 'block',
        })
    }
    else if (this.state.display_name == 'block') {
        this.setState({
            display_name: 'none',
        })
    }
}


  render() {

    let numGuest = this.state.numberOfGuests;
    let tableTitle = `People: ${numGuest}, Total price: ${(modelInstance.getTotalMenuPrice() * numGuest).toFixed(2)}`;
    let count = 0;
    let items = modelInstance.selectedDish.map(item => {
      count++
      return (
        <tr key={count}>
          <td className="v-mid fw4 avenir tc pv3 pr3 bb b--black-20">{item.title}</td>
          <td className="v-mid fw4 avenir tc pv3 pr3 bb b--black-20">{(item.pricePerServing * numGuest).toFixed(2)}</td>
          <td className="v-mid fw4 avenir tc pv3 pr3 bb b--black-20" onClick={() => { this.removeMenuClick(item.id) }}>delete</td>
        </tr>
      )
    })

    return (
      <div className="Sidebar fl w-third-l w-100 w-50-m pa2 center">
        <h3 className="tc avenir">My Dinner</h3>
        <p className="center avenir tc">
          People:
          <input
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.onNumberOfGuestsChanged}
          />
        </p>
        <a className="hide-bar avenir tc flex items-center justify-center pa1 bg-lightest-blue navy" onClick={this.display_name.bind(this)}> hide</a>
        {/* table here */}
        
        <div className="pa4 table-sidebar" style={{display:this.state.display_name}}>
          <div className="overflow-auto">
            <table className="f6 w-100 mw8 center" cellSpacing="0">
              <thead>
                <tr>
                  <th className="fw6 avenir tc bb b--black-20 tl pv3 pr3 bg-white">Name</th>
                  <th className="fw6 avenir tc bb b--black-20 tl pv3 pr3 bg-white">Quantity</th>
                  <th className="fw6 avenir tc bb b--black-20 tl pv3 pr3 bg-white">Modify</th>
                </tr>
              </thead>
              <tbody className="lh-copy">
                {items}
              </tbody>
              <caption className="pa2 fw6 avenir tc bb b--black-20 tl bg-white">
                {tableTitle}
              </caption>
            </table>
          </div>
        </div>
        <div className="checkout-btn tc center">
          <Link className="avenir f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa2 ba border-box"
            to="/menuOverview">checkout</Link></div>
      </div>
    );
  }
}

export default Sidebar;
