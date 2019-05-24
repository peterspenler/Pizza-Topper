import React from 'react';
import {Switch, Route} from 'react-router-dom'
import UserComponent from './UserComponent'
import SelectComponent from './SelectComponent'
import PizzaComponent from './PizzaComponent'

class Selector extends React.Component{
	constructor(props){
		super(props)
		this.notifyRef = React.createRef()
		this.state = {
			notifyClass: 'notify',
			notification: 'Notification',
			currentUser: {Name:"Peter", Id:1},
			userList: [{Name:"Peter", Id:1}],
			providers: [{Name:'', Value: '', Id:'', Ingredients:[]}],
			providerIndex: 0
		}
	}

	componentDidMount(){
		console.log("MOUNT_SELECT")
		fetch("http://localhost:4000/static/providers.json")
		.then(res => res.json())
    	.then(
    		(result) => {
    			this.setState({
    				providers: result.Providers,
    			})
			},
			(error) => {
				console.log(error)
			}
		)
	}

	showNotification = msg => {
		this.setState({
			notifyClass: 'notify-show',
			notification: msg
		})
		setTimeout(() =>{
			this.setState({
				notifyClass: 'notify'
			})
		}, 2000)
	}

	removeUser = id => {
		if(id !== this.state.currentUser.Id){
			const filteredUserList = this.state.userList.filter(user => {
				return user.Id !== id
			})
			this.setState({
				userList: filteredUserList
			})
		}
	}

	addUser = user => {
		const newUser = user
		if(user.name !== ""){
			const newUserList = [...this.state.userList, newUser]
			this.setState({
				userList: newUserList
			})
		}
	}

	modIngredient = (user, ingredient, status) => {
		let userIndex = this.state.userList.findIndex((obj => obj.Id === user.Id))
		let entry = {Id:ingredient.Id, status:'green'}
		let userList = this.state.userList
		let ingredientList = userList[userIndex].Ingredients
		if (typeof(ingredientList) === 'undefined'){
			ingredientList = []
		}
		
		let ingredientIndex = ingredientList.findIndex((obj => obj.Id === ingredient.Id))
		let newIngredientList

		if(ingredientIndex !== -1){
			if(ingredientList[ingredientIndex].status === "green"){
				ingredientList[ingredientIndex].status = "red"
			}else if(ingredientList[ingredientIndex].status === "grey"){
				ingredientList[ingredientIndex].status = "green"
			}else{
				ingredientList[ingredientIndex].status = "grey"
			}
			newIngredientList = ingredientList
		}else{
			newIngredientList = [...ingredientList, entry]
		}
		userList[userIndex].Ingredients = newIngredientList
		this.setState({
			userList: userList
		})
	}

	getIngredients = userId =>{
		let user = this.state.userList.find((obj => obj.Id === userId))
		if(typeof(user) === "undefined" || typeof(user.Ingredients) === 'undefined'){
			return []
		}else{
			return user.Ingredients
		}
	}

	changeProvider = value => {
		let index = this.state.providers.findIndex((obj => obj.Value === value))
		if(index !== -1){
			this.setState({
				providerIndex: index
			})
		}
	}

	render(){
		return(
			<div className="selector">
				<div className='selector-window'>
					<div className="window-header">{this.props.page}</div>
					<div className="window-content">
						<Switch>
							<Route exact path="/" render={(props) => <UserComponent {...props}
								user={this.state.currentUser}
								userList={this.state.userList}
								addUser={this.addUser}
								removeUser={this.removeUser}
								showNotification={this.showNotification}
							/>}/>
							<Route path="/users" render={(props) => <UserComponent {...props}
								user={this.state.currentUser}
								userList={this.state.userList}
								addUser={this.addUser}
								removeUser={this.removeUser}
								showNotification={this.showNotification}
							/>}/>
							<Route path="/select" render={(props) => <SelectComponent {...props}
								user={this.state.currentUser}
								userList={this.state.userList}
								modIngredient={this.modIngredient}
								getIngredients={this.getIngredients}
								providers={this.state.providers}
								ingredients={this.state.providers[this.state.providerIndex].Ingredients}
								providerValue={this.state.providers[this.state.providerIndex].Value}
								changeProvider={this.changeProvider}
							/>}/>
							<Route path="/pizza" render={(props) => <PizzaComponent {...props}
								showNotification={this.showNotification}
							/>}/>
						</Switch>
						<div className={this.state.notifyClass}>{this.state.notification}</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Selector;