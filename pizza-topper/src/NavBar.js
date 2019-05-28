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

		let userIcon = require('./graphics/icon_user_black.png')
		let selectIcon = require('./graphics/icon_select_black.png')
		let pizzaIcon = require('./graphics/icon_pizza_black.png')

		if(this.props.page === "User" || this.props.page === "/"){
			userClass = "selected"
			userIcon = require('./graphics/icon_user_blue.png')
		}
		if(this.props.page === "Select"){
			selectClass = "selected"
			selectIcon = require('./graphics/icon_select_blue.png')
		}
		if(this.props.page === "Pizza"){
			pizzaClass = "selected"
			pizzaIcon = require('./graphics/icon_pizza_blue.png')
		}


		return(
			<div className="navbar">
				<p>Pizza Topper</p>
				<Link to='/users'>
					<button id="user-btn" className={userClass} onClick={e => this.handleClick(e, "user")}>
						<img className="icon" src={userIcon} alt="User by Hrbon from Noun Project"/>
					</button>
				</Link>
				<Link to='/select'>
					<button id="select-btn" className={selectClass} onClick={e => this.handleClick(e, "select")}>
						<img className="icon" src={selectIcon} alt="click by Numero Uno from Noun Project"/>
					</button>
				</Link>
				<Link to='/pizza'>
					<button id="pizza-btn" className={pizzaClass} onClick={e => this.handleClick(e, "pizza")}>
						<img className="icon" src={pizzaIcon} alt="pizza slice by Vectors Market from Noun Project"/>
					</button>
				</Link>
			</div>
		)
	}
}

export default NavBar;