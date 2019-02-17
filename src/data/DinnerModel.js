import ObservableModel from "./ObservableModel";

const BASE_URL = "http://sunset.nada.kth.se:8080/iprog/group/61";
const httpOptions = {
  method: "GET",
  headers: { "X-Mashape-Key": "3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767" }
};

class DinnerModel extends ObservableModel {
  constructor() {
    super();
    this._numberOfGuests = 2;
    this.getNumberOfGuests();
    this.currentDish = undefined;
    this.currentId = undefined;
    this.selectedDish = new Array();
    this.selectedId = new Array();
  }

  /**
   * Get the number of guests
   * @returns {number}
   */
  getNumberOfGuests() {
    return this._numberOfGuests;
  }

  /**
   * Set number of guests
   * @param {number} num
   */
  setNumberOfGuests(num) {
    this._numberOfGuests = num;
    this.notifyObservers();
  }

  //Returns ingredients for the dishes on the menu.
  getIngredients(dish) {
    if (!dish) return undefined
    else return dish["extendedIngredients"].map(item => {
      return {
        "name": item["name"]
      }
    })
  }

  //add dishes to Menu
  addDishToMenu() {
    this.selectedId.push(this.currentId)
    this.selectedDish.push(this.currentDish)
    //console.log(this.selectedDish)
    this.notifyObservers()
  }

  //Removes dish from menu
  removeDishFromMenu(id) {
    this.selectedDish = this.selectedDish.filter(item => item["id"] != id)
    this.notifyObservers()
  }


  //Return the price of a dish
  getDishPrice(dish) {
    
    return dish["pricePerServing"]
  }

  //Returns the total price of the menu (all the ingredients multiplied by number of guests).
  getTotalMenuPrice() {
    if (this.selectedDish.length == 0) {
      return 0
    } else {
      return this.selectedDish.map(dish => this.getDishPrice(dish)).reduce((a, b) => a + b)
    }

  }

  // API methods

  /**
   * Do an API call to the search API endpoint.
   * @returns {Promise<any>}
   */
  getAllDishes(type, query) {
    let number = 15
    let offset = 0
    const url = `${BASE_URL}/recipes/search?number=${number}&offset=${offset}&query=${query}&type=${type}`;
    return fetch(url, httpOptions).then(this.processResponse);
  }

  getDish(id) {
    const url = `${BASE_URL}/recipes/${id}/information`;
    return fetch(url, httpOptions).then(this.processResponse)
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    }
    throw response;
  }

  //function that returns a dish of specific ID
  setId(id) {
    this.currentId = id;
    this.notifyObservers()
  }

  setCurrent(id, dish) {
    this.currentId = id
    this.currentDish = dish
    this.notifyObservers()
  }

  setSelected(value) {
    this.selectedDish = value
  }


}

// Export an instance of DinnerModel
const modelInstance = new DinnerModel();
export default modelInstance;
