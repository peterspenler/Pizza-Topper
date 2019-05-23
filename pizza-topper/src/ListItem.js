import React from 'react'

class ListItem extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			type: this.props.type,
		}
	}

	handleClick = e => {
		e.preventDefault()
		if(this.props.type === "suggest" || this.props.type === "ingredient"){
			this.props.onItemClick(this.props.object)
		}
	}

	handleRemove = e => {
		e.stopPropagation()
		this.props.removeUser(this.props.object)
	}

	getColor = () => {
		let ingredients = this.props.getIngredients(this.props.userId)
		let index = ingredients.findIndex((obj => obj.Id === this.props.object.Id))
		if(index === -1){
			return 'grey'
		}else{
			return ingredients[index].status
		}
	}

	render() {
		const type = this.state.type
		let exitButton
		let color="grey"

		if(type === "user"){
			exitButton = <div className="remove-btn" onClick={this.handleRemove}>X</div>
		}else if(type === "suggest"){
			exitButton = ""
		}else if(type === "ingredient"){
			color = this.getColor()
		}

		return(
			<li className={color} onClick={this.handleClick}>
				{this.props.content}
				{exitButton}
			</li>
		)
	}
}
export default ListItem