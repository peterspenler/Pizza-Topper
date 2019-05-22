import React from 'react';

class UserComponent extends React.Component{
	constructor(props){
		super(props)
		this.maxId = Math.max(...this.props.userList.map(item => item.Id)) + 1
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

		var url = "http://localhost:4000/data/" + e.target.value

		console.log(url)

		fetch(url)
		.then(res => res.json())
    	.then(
    		(result) => {
    			this.setState({
					suggestions: result.Suggestions
				});
				console.log(this.state.suggestions)
				//console.log(result.Suggestions)
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
		this.props.addUser({name:this.state.search, id:this.maxId})
		this.maxId++
		this.setState({
			search:''
		})
	}

	createList = user => {
		return(
			<li key={user.Id} >
				{user.Name}
			</li>
		)
	}

	render(){
		const userListItems = this.props.userList.map(this.createList)
		const suggestListItems = this.state.suggestions.map(this.createList)

		return(
			<div className="userComp">
				<input 
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

export default UserComponent;