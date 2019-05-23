import React from 'react';
import ListItem from './ListItem.js'

class SelectComponent extends React.Component{
	constructor(props){
		super(props)
		this.providers = [
			{	Name: "test",
				Ingredients: [
					{Name:'Pepperoni', Id:1},
					{Name:'Green Peppers', Id:2},
					{Name:'Onions', Id:3},
					{Name:'Jalapenos', Id:4},
					{Name:'Sausage', Id:5},
					{Name:'Tomatos', Id:6},
					{Name:'Bacon', Id:7},
					{Name:'Chicken', Id:8},
					{Name:'Spinach', Id:9},
					{Name:'Pineapple', Id:10},
				]
			},
			{	Name: "test2",
				Ingredients: [
					{Name:'Pepperoni', Id:1},
					{Name:'Green Peppers', Id:2},
					{Name:'Red Peppers', Id:12},
					{Name:'Jalapenos', Id:4},
					{Name:'Beef', Id:11},
					{Name:'Tomatos', Id:6},
					{Name:'Bacon', Id:7},
				]
			}
		]
		this.state = {
			currentUser: this.props.user,
			ingredients: this.providers[0].Ingredients,
			providerName: this.providers[0].Name
		}
	}

	componentDidMount(){
		fetch("http://localhost:4000/static/providers.json")
		.then(res => res.json())
    	.then(
    		(result) => {
    			this.providers = result.Providers
			},
			(error) => {
				console.log(error)
			}
		)
	}

	createUserList = user => {
		return(
			<ListItem
				key={user.Id}
				object={user}
				content={user.Name}
				onItemClick={this.onUserClick}
				user={this.state.currentUser}
				type="select"
			/>
		)
	}

	createIngredientList = ingredient => {
		return(
			<ListItem 
				key={ingredient.Id}
				content={ingredient.Name}
				object={ingredient}
				onItemClick={this.onIngredientClick}
				getIngredients={this.props.getIngredients}
				userId={this.state.currentUser.Id}
				type="ingredient"
			/>
		)
	}

	onUserClick = user => {
		this.setState({
			currentUser: user
		})
	}

	onIngredientClick = ingredient => {
		this.props.modIngredient(this.state.currentUser, ingredient, 'green')
	}

	onProviderSelect = e => {
		e.preventDefault()
		let index = this.providers.findIndex((obj => obj.Name === e.target.value))
		if(index !== -1){
			this.setState({
				ingredients: this.providers[index].Ingredients,
				providerName: e.target.value
			})
		}
	}

	render(){
		const userListItems = this.props.userList.map(this.createUserList)
		const ingredientListItems = this.state.ingredients.map(this.createIngredientList)
		return(
			<div className="selectComp">
				<ul className="userList users">
					Users:
					{userListItems}
				</ul>
				<div>
					Provider:<br/>
					<select value={this.state.providerName} onChange={this.onProviderSelect}>
						<option value="test">Test</option>
						<option value="test2">Test 2</option>
						<option value="dominos">Dominos</option>
						<option value="pizza-pizza">Pizza Pizza</option>
						<option value="papa-johns">Papa John's</option>
						<option value="toppers">Topper's</option>
					</select>
				</div>
				<ul className="ingredientList">
					{ingredientListItems}
				</ul>
			</div>
		)
	}
}

export default SelectComponent;