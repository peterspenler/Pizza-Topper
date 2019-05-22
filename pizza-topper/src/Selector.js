import React from 'react';
import {Switch, Route} from 'react-router-dom'
import UserComponent from './UserComponent'
import SelectComponent from './SelectComponent'
import PizzaComponent from './PizzaComponent'

class Selector extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			userList: [{Name:"Peter", Id:-1}, {Name:"John", Id:-2}, {Name:"Laura", Id:-3}, {Name:"Andrew", Id:-4}],
		}
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
							/>}/>
							<Route path="/users" render={(props) => <UserComponent {...props}
								user={{name:"peter", id:'1'}}
								userList={this.state.userList}
								addUser={this.addUser}
							/>}/>
							<Route path="/select" render={(props) => <SelectComponent {...props}
								window="select"
							/>}/>
							<Route path="/pizza" render={(props) => <PizzaComponent {...props}
								window="pizza"
							/>}/>
						</Switch>
					</div>
				</div>
			</div>
		)
	}
}

export default Selector;