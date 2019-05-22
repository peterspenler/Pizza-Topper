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
			userList: [{Name:"Peter", Id:1}],
		}
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

	addUser = user => {
		const newUser = user
		if(user.name !== ''){
			const newUserList = [...this.state.userList, newUser]
			this.setState({
				userList: newUserList
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
								user={{name:"peter", id:'1'}}
								userList={this.state.userList}
								addUser={this.addUser}
								showNotification={this.showNotification}
							/>}/>
							<Route path="/users" render={(props) => <UserComponent {...props}
								user={{name:"peter", id:'1'}}
								userList={this.state.userList}
								addUser={this.addUser}
								showNotification={this.showNotification}
							/>}/>
							<Route path="/select" render={(props) => <SelectComponent {...props}
								showNotification={this.showNotification}
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