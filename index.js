
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0

class Neighborhood{
  constructor(name){
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id);
  }

  customers() {
    return store.customers.filter(customer => customer.neighborhoodId === this.id);
  }

  meals() {
    // debugger;
    const mealsArray = this.deliveries().map(delivery => delivery.meal());
    const merged = [].concat.apply([], mealsArray);
    return [...new Set(merged)];
  }
};

class Meal{
  constructor(title, price = 0){
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.mealId === this.id);
  }

  customers() {
    return this.deliveries().map(delivery => delivery.customer());
  }

  static byPrice() {
    // debugger;
    return store.meals.sort((mealA, mealB) => (mealA.price < mealB.price))
  }
}

class Customer {
  constructor(name, neighborhoodId){
    //debugger
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(delivery => delivery.customerId === this.id);
  }

  meals() {
    // debugger;
    return this.deliveries().map(delivery => delivery.meal());
  }

  totalSpent() {
  //   return this.meals().map(meal => meal.price).reduce(function(accumulator, price) {return accumulator += price;})
  // }
  // BETTER!:
    return this.meals().reduce((total, meal) => (total += meal.price), 0);
  }
}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
    // console.log(store)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
