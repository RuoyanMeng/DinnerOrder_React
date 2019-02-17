import React, { Component } from "react";
import { Link } from "react-router-dom";

import modelInstance from "../data/DinnerModel";
import "./Dish.css";

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

class Dish extends Component {
    constructor(props) {
        super(props);

        let id = modelInstance.currentId
        this.state = {
            status: "LOADING",
            id: id,
            numberOfGuests: this.props.model.getNumberOfGuests()

        };
        console.log(this.state.numberOfGuests)

    }

    componentDidMount() {
        modelInstance
            .getDish(this.state.id)
            .then(dish => {
                modelInstance.setCurrent(this.state.id, dish)
                this.setState({
                    status: "LOADED",
                    dish: dish,
                });
            })
            .catch(() => {
                this.setState({
                    status: "ERROR"
                });
            });
        this.props.model.addObserver(this);
        let numberOfGuests = storage.get('numberOfGuests');
        let selectedDish = storage.get('selectedDish');
        if (numberOfGuests && selectedDish) {
            modelInstance.setNumberOfGuests(numberOfGuests);
            modelInstance.setSelected(selectedDish);
            this.setState({
                numberOfGuests: numberOfGuests,
                selectedDish: selectedDish
            });
        }
    }

    componentWillUnmount() {
        this.props.model.removeObserver(this);
    }

    update() {
        this.setState({
            numberOfGuests: this.props.model.getNumberOfGuests()

        });
    }

    addMenuClick() {
        modelInstance.addDishToMenu()
        storage.set('selectedDish', modelInstance.selectedDish);
        //console.log(localStorage)
    }



    render() {
        let dish = null;
        switch (this.state.status) {
            case "LOADING":
                dish = <em>Loading...</em>;
                break;
            case "LOADED":
                let _dish = this.state.dish;
                let count = 0;
                let numGuest = modelInstance.getNumberOfGuests();
                let ingredients = _dish.extendedIngredients.map(item => {
                    count++
                    return (
                        <tr key={count}>
                            <td className=" v-mid fw4 avenir tc pv3 pr3 bb b--black-20">{item.name}</td>
                            <td className=" v-mid fw4 avenir tc pv3 pr3 bb b--black-20">{item.amount * numGuest}</td>
                            <td className=" v-mid fw4 avenir tc pv3 pr3 bb b--black-20">{item.unit}</td>
                        </tr>
                    )
                });

                let tableTitle = `Ingredient for ${modelInstance.getNumberOfGuests()} People, Price: ${_dish.pricePerServing * numGuest}`

                dish =
                    <div>
                        <h1 className="tc normal avenir">{_dish.title}</h1>
                        <img src={_dish.image} className="db w-50 br2 br--top center" />
                        <h4 className="fw3 tc avenir">{_dish.instructions}</h4>
                        <div className="pa4">
                            <div className="overflow-auto">
                                <table className="f6 w-100 mw8 center" cellSpacing="0">
                                    <caption className="pa2 fw6 avenir tc bb b--black-20 tl pb3 pr3 bg-white">
                                        {tableTitle}
                                    </caption>
                                    <thead>
                                        <tr>
                                            <th className=" v-mid fw6 avenir tc bb b--black-20 tl pv3 pr3 bg-white">Name</th>
                                            <th className=" v-mid fw6 avenir tc bb b--black-20 tl pv3 pr3 bg-white">Quantity</th>
                                            <th className=" v-mid fw6 avenir tc bb b--black-20 tl pv3 pr3 bg-white">Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody className="lh-copy">
                                        {ingredients}
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                    ;
                break;
            default:
                dish = <b>aaaFailed to load data, please try again</b>;
                break;
        }

        return (
            <div className="Dishes fl w-two-thirds w-100 w-50-m pa2">
                <Link to="/search" className=" avenir f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box">Back to Search</Link>
                {dish}
                <Link to="/search" className="avenir f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box"
                    onClick={() => this.addMenuClick()}>
                    Add to Menu
                </Link>
            </div>
        );
    }

}

export default Dish;