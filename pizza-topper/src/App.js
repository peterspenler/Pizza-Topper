import React from 'react';
import './App.css';
import NavBar from './NavBar.js'
import Selector from './Selector'

class App extends React.Component {
	constructor(){
		super()
		this.state = {
			page: "User",
		}
	}

	componentDidMount(){
		let path = window.location.pathname
		let page = ""
		if(path === "/users" || path === "/"){
			page = "User"
		}else if(path === "/select"){
			page = "Select"
		}else if(path === "/pizza"){
			page = "Pizza"
		}
		this.setState({
			page: page
		})
	}

	changePage = page =>{
		this.setState({
			page: page
		})
	}

	render(){
		return (
			<div className="App">
				<NavBar 
					changePage = {this.changePage}
					page = {this.state.page}
				/>
				<Selector 
					page = {this.state.page}
				/>
			</div>
		);
	}
}

export default App;