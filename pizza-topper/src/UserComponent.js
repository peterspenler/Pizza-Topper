import React from 'react';

class UserComponent extends React.Component{
	constructor(props){
		super(props)
		this.searchRef = React.createRef()
		this.localId = 0
		this.state = {
			search: '',
			suggestions: []
		}
	}

	handleInput = e => {
		const searchText = e.target.value
		this.setState({
			search: searchText
		})

		fetch("http://localhost:4000/data/" + e.target.value)
		.then(res => res.json())
    	.then(
    		(result) => {
    			this.setState({
					suggestions: result.Suggestions
				});
			},
			(error) => {
				console.log(error)
			}
		)
	}

	handleKeyDown = e => {
		if(e.key === 'Enter'){
			this.addGuest(e)
		}
	}

	addGuest = e => {
		e.preventDefault()
		this.props.addUser({Name:this.state.search, Id:this.localId})
		this.localId--
		this.setState({
			search:''
		})
	}

	selectUser = user => {
		var ids = this.props.userList.map(item => item.Id)
		if(ids.includes(user.Id)){
			this.props.showNotification( user.Name + " is already added")
		}else{
			this.props.addUser(user)
			this.setState({
				search:'',
				suggestions: []
			})
		}
		this.searchRef.current.focus()
	}

	createSuggestList = user => {
		return(
			<ListItem
				key={user.Id}
				user={user}
				onItemClick={this.selectUser}
				type="suggest"
			/>
		)
	}

	createUserList = user => {
		return(
			<ListItem
				key={user.Id}
				user={user}
				onItemClick={this.selectUser}
				type="user"
			/>
		)
	}

	render(){
		const userListItems = this.props.userList.map(this.createUserList)
		const suggestListItems = this.state.suggestions.map(this.createSuggestList)

		return(
			<div className="userComp">
				<input
					ref={this.searchRef}
					placeholder="User Name" 
					value={this.state.search}
					onChange={this.handleInput}
					onKeyDown={this.handleKeyDown}
				></input>
				
				<ul className="suggestList">
					{suggestListItems}
				</ul>

				<button className="addGuest" onClick={this.addGuest}> Add name as Guest </button>

				<ul className="userList">
					Users:
					{userListItems}
				</ul>
			</div>
		)
	}
}

class ListItem extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			type: this.props.type
		}
	}

	handleClick = e => {
		e.preventDefault()
		if(this.props.type === "suggest"){
			this.props.onItemClick(this.props.user)
		}else if(this.props.type === "user"){
			console.log("USER")
		}
	}

	handleRemove = e => {
		e.stopPropagation()
		console.log("REMOVE")
	}

	render() {
		const type = this.state.type
		let exitButton

		if(type === "user"){
			exitButton = <div className="remove-btn" onClick={this.handleRemove}>X</div>
		}else if(type === "suggest"){
			exitButton = ""
		}
		return(
			<li onClick={this.handleClick}>
				{this.props.user.Name}
				{exitButton}
			</li>
		)
	}
}

export default UserComponent;