import React, { Component } from "react";
import { Link } from "react-router-dom";

import modelInstance from "../data/DinnerModel";
import "./DishCheckout.css";

class DishCheckout extends Component {

    constructor(props) {
        super(props);

        let dishes = modelInstance.selectedDish
        this.state = {
            status: "LOADING",
            dishes: dishes,
            display_name: 'none'
        };
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

        let cards = this.state.dishes.map(dish => {
            return (
                <article className="avenir br2 ba dark-gray b--black-10 mv4 w-100 w-70-m w-30-l mw5" key={dish.id}>
                    <img src={dish.image} className="db w-100 br2 br--top" />
                    <div className="pa2 ph3-ns pb3-ns">
                        <div className="dt w-100 mt1">
                            <h1 className="f5 fw5 tc f4-ns mv0">{dish.title}</h1>
                        </div>
                    </div>
                </article>
            )
        });

        let recipe = this.state.dishes.map(dish => {
            let ingredient = dish.extendedIngredients.map(name => {
                return (
                    <h4 className="avenir tc fw4">{name.name}</h4>
                )
            })
            return (
                <div>
                    <div className="ph2-ns flex items-center">
                        <div className=" w-50 w-30-l pa2 center">
                            <div className=" bg-white pv4"><h4 className="avenir tc fw6">{dish.title}</h4><img src={dish.image} className="db w-100 br2 br--top" /></div>
                        </div>
                        <div className=" w-50 w-30-l pa2 center">
                            <div className=" bg-white pv4">{ingredient}</div>
                        </div>
                    </div>
                    <div className=" w-100 pa2">
                        <div className="tc avenir bg-white pv4">{dish.instructions}</div>
                    </div>
                </div>
            )
        });


        let numGuest = modelInstance.getNumberOfGuests();
        let overview = `People: ${numGuest}, Total price: ${(modelInstance.getTotalMenuPrice() * numGuest).toFixed(2)}`

        return (
            <div className="CheckoutView flex flex-wrap justify-center">
                <h3 className="avenir fw7 tc w-100">{overview}</h3>
                <div className="center">
                    <a className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box center"
                        onClick={this.display_name.bind(this)}>Show Recipe</a>
                    <Link className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box fr"
                        to="/search">Back to Edit</Link>
                </div>
                <div className="flex justify-center w-100">{cards}</div>
                {/* <a className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4 center"
                    onClick={this.display_name.bind(this)}>Show Recipe</a> */}
                <div className="fl w-100 pa2" style={{ display: this.state.display_name }}>
                    <div className="mw9 center ph3-ns">
                        {recipe}
                    </div>
                </div>
            </div>

        );
    }
}

export default DishCheckout;
