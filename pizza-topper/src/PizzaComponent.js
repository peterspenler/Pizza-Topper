import React from 'react';
import ListItem from './ListItem.js'

class PizzaComponent extends React.Component{

	handleCount = e =>{
		e.preventDefault()
		this.props.updateNumPizzas(e.target.value)
	}

	createPizzaList = pizza => {
		return(
			<PizzaItem
				key={pizza.Id}
				pizza={pizza}
				updateIngredientNum={this.props.updateIngredientNum}
			/>
		)
	}

	render(){

		let pizzaList = this.props.pizzas.map(this.createPizzaList)

		return(
			<div className="pizzaComp">
				<div>
					# of Pizzas:<br/> 
					<input type="number" name="num-pizzas" value={this.props.numPizzas} min="1" max="20"
							onChange={this.handleCount}/>
				</div>
				<br/>
				Your Pizzas:
				<div className="pizza-container">
					{pizzaList}
				</div>
			</div>
		)
	}
}

class PizzaItem extends React.Component{
	handleClick = e => {
		e.preventDefault()
		this.props.updateIngredientNum(this.props.pizza.Id, e.target.value)
	}

	createIngredientList = ingredient => {
		return(
			<ListItem 
				key={ingredient.Id}
				content={ingredient.Name}
				object={ingredient}
				type="pizza-ingredient"
			/>
		)
	}

	render(){
		let ingredientList = this.props.pizza.Ingredients.map(this.createIngredientList)

		return(
			<div className="pizza-item">
				<span className="pizza-title">Pizza {this.props.pizza.Id}</span>
				<span className="pizza-ingredients">
					<span># of Ingredients: </span> 
					<input type="number" name="num-ingredients" value={this.props.pizza.NumIngredients}
					onChange={this.handleClick}/>
				</span>
				<div className="ingredient-container">
					{ingredientList}
				</div>
			</div>
		)
	}
}

export default PizzaComponent;