import React from 'react';
import {Link} from 'react-router-dom'

class NavBar extends React.Component {

	handleClick(e, button){
		if(button === "user"){
			this.props.changePage("User")
		}
		if(button === "select"){
			this.props.changePage("Select")
		}
		if(button === "pizza"){
			this.props.changePage("Pizza")
		}
	}

	render() {
		let userClass = ""
		let selectClass = ""
		let pizzaClass = ""

		if(this.props.page === "User" || this.props.page === "/"){
			userClass = "selected"
		}
		if(this.props.page === "Select"){
			selectClass = "selected"
		}
		if(this.props.page === "Pizza"){
			pizzaClass = "selected"
		}


		return(
			<div className="navbar">
				<p>Pizza Topper</p>
				<Link to='/users'>
					<button id="user-btn" className={userClass} onClick={e => this.handleClick(e, "user")}>
						<img className="icon" alt="Users" src={require('./graphics/user-icon.png')}/>
					</button>
				</Link>
				<Link to='/select'>
					<button id="select-btn" className={selectClass} onClick={e => this.handleClick(e, "select")}>
						<img className="icon" alt="Select toppings" src={require('./graphics/select-icon.png')}/>
					</button>
				</Link>
				<Link to='/pizza'>
					<button id="pizza-btn" className={pizzaClass} onClick={e => this.handleClick(e, "pizza")}>
						<img className="icon" alt="Pizzas" src={require('./graphics/pizza-icon.png')}/>
					</button>
				</Link>
			</div>
		)
	}
}

export default NavBar;