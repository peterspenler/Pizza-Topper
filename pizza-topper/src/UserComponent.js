import React from 'react';
import Alert from './Alert.js'
import ListItem from './ListItem.js'

class UserComponent extends React.Component{
	constructor(props){
		super(props)
		this.searchRef = React.createRef()
		this.alertRef = React.createRef()
		this.localId = -1
		this.state = {
			search: '',
			suggestions: [],
			selectedUser: {Name:'', Id:''}
		}
	}

	handleInput = e => {
		const searchText = e.target.value
		this.setState({
			search: searchText
		})

		fetch("http://192.168.1.138:4000/data/" + e.target.value)
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
		if(this.state.search !== ""){
			this.props.addUser({Name:this.state.search, Id:this.localId})
			this.localId--
		}
		this.setState({
			search:'',
			suggestions: []
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

	removeUser = user => {
		if(user.Id !== this.props.user.Id){
			this.setState({
				selectedUser: user
			})
			this.alertRef.current.showAlert("Remove " + user.Name + "?",
				this.removeConfirm.bind(this), 
				this.removeCancel.bind(this))
		}else{
			this.props.showNotification("Cannot remove yourself")
		}
	}

	removeConfirm = (user) => {
		console.log(this.state.selectedUser.Id)
		this.props.removeUser(this.state.selectedUser.Id)
	}

	removeCancel = () => {
		console.log("NOT REMOVE")	
	}

	createSuggestList = user => {
		return(
			<ListItem
				key={user.Id}
				object={user}
				content={user.Name}
				onItemClick={this.selectUser}
				type="suggest"
			/>
		)
	}

	createUserList = user => {
		return(
			<ListItem
				key={user.Id}
				object={user}
				content={user.Name}
				onItemClick={this.selectUser}
				removeUser={this.removeUser}
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
				
				<ul className="userList suggest">
					{suggestListItems}
				</ul>

				<button className="addGuest" onClick={this.addGuest}> Add name as Guest </button>

				<ul className="userList users">
					Users:
					{userListItems}
				</ul>
				<Alert
					ref={this.alertRef}
				/>
			</div>
		)
	}
}

export default UserComponent;