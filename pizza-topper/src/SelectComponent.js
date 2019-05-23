import React from 'react';
import ListItem from './ListItem.js'

class SelectComponent extends React.Component{
	constructor(props){
		super(props)
		this.ingredients = [
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
		this.state = {
			currentUser: this.props.user
		}
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

	render(){
		const userListItems = this.props.userList.map(this.createUserList)
		const ingredientListItems = this.ingredients.map(this.createIngredientList)
		return(
			<div className="selectComp">
				<ul className="userList users">
					Users:
					{userListItems}
				</ul>
				<ul className="ingredientList">
					{ingredientListItems}
				</ul>
			</div>
		)
	}
}

export default SelectComponent;