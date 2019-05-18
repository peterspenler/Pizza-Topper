import React from 'react';
import './App.css';
import NavBar from './NavBar.js'
import Header from './Header.js'
import Selector from './Selector'

class App extends React.Component {
  constructor(){
    super()
    this.state = {
      page: "User"
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
        />
      </div>
    );
  }
}

export default App;
