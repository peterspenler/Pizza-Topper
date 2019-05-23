import React from 'react'

class Alert extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			alert: "No alert set",
			showAlert: false,
			alertPosCallback: null,
			alertNegCallback: null,
			posBtn: "Yes",
			negBtn: "No",
			showPos: true,
			showNeg: true,
		}
	}

	showAlert = (msg, positive=null, negative=null, posBtn="Yes", negBtn="No") => {
		const showPos = (positive != null) ? true:false;
		const showNeg = (negative != null) ? true:false;
		this.setState({
			alert: msg,
			showAlert: true,
			alertPosCallback: positive,
			alertNegCallback: negative,
			posBtn: posBtn,
			negBtn: negBtn,
			showPos: showPos,
			showNeg: showNeg,
		})
	}

	alertNegative = e => {
		e.stopPropagation()
		this.state.alertNegCallback()
		this.hideAlert(false)
	}

	alertPositive = e => {
		e.stopPropagation()
		this.state.alertPosCallback()
		this.hideAlert(false)
	}

	hideAlert = (sendNeg = true) => {
		this.setState({
			showAlert: false
		})
		if(sendNeg && (this.state.alertNegCallback != null)){
			this.state.alertNegCallback()
		}
	}

	render(){
		return(
			<div>
				{this.state.showAlert && <div className="dialog-background" onClick={this.hideAlert}>
					<div className="remove-dialog" onClick={(e) => e.stopPropagation()}>
						<div className="window-header">Alert</div>
						<div className="window-content">
							<div className="alert-msg">{this.state.alert}</div>
							{this.state.showPos && <button className="pos-btn" onClick={this.alertPositive}>{this.state.posBtn}</button>}
							{this.state.showNeg && <button className="neg-btn" onClick={this.alertNegative}>{this.state.negBtn}</button>}
						</div>
					</div>
				</div>}
			</div>
		);
	}
}

export default Alert
