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
				/>
				<Selector 
					page = {this.state.page}
					showAlert={this.showAlert}
				/>
			</div>
		);
	}
}

export default App;