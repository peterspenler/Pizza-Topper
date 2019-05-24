import React from 'react';
import ListItem from './ListItem.js'

class SelectComponent extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			currentUser: this.props.user,
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

	createProviderList = provider => {
		if(provider.Value === "master"){
			return
		}
		return(
			<option key={provider.Id} value={provider.Value}>{provider.Name}</option>
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
		this.props.changeProvider(e.target.value)
	}

	render(){
		const userListItems = this.props.userList.map(this.createUserList)
		const ingredientListItems = this.props.ingredients.map(this.createIngredientList)
		const providerList = this.props.providers.map(this.createProviderList)

		return(
			<div className="selectComp">
				<ul className="userList users">
					Users:
					{userListItems}
				</ul>
				<div>
					Provider:<br/>
					<select value={this.props.providerValue} onChange={this.onProviderSelect}>
						{providerList}
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