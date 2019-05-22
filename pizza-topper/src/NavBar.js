import React from 'react';
import {Link} from 'react-router-dom'

class NavBar extends React.Component {
	handleClick(e, button){
		const userBtn = document.getElementById("user-btn")
		const selectBtn = document.getElementById("select-btn")
		const pizzaBtn = document.getElementById("pizza-btn")

		//e.preventDefault()
		userBtn.className = ""
		selectBtn.className = ""
		pizzaBtn.className = ""
		if(button === "user"){
			userBtn.className = "selected"
			this.props.changePage("User")
		}
		if(button === "select"){
			selectBtn.className = "selected"
			this.props.changePage("Select")
		}
		if(button === "pizza"){
			pizzaBtn.className = "selected"
			this.props.changePage("Pizza")
		}
	}

	render() {
		return(
			<div className="navbar">
				<p>Pizza Topper</p>
				<Link to='/users'>
					<button id="user-btn" className="selected" onClick={(e) => this.handleClick(e, "user")}>
						<img className="icon" alt="Users" src={require('./graphics/user-icon.png')}/>
					</button>
				</Link>
				<Link to='/select'>
					<button id="select-btn" onClick={(e) => this.handleClick(e, "select")}>
						<img className="icon" alt="Select toppings" src={require('./graphics/select-icon.png')}/>
					</button>
				</Link>
				<Link to='/pizza'>
					<button id="pizza-btn" onClick={(e) => this.handleClick(e, "pizza")}>
						<img className="icon" alt="Pizzas" src={require('./graphics/pizza-icon.png')}/>
					</button>
				</Link>
			</div>
		)
	}
}

export default NavBar;