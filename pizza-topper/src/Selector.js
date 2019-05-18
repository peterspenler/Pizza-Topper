import React from 'react';

class Selector extends React.Component{
	render(){
		return(
			<div className="selector">
				<div className='selector-window'>
					<div className="window-header">{this.props.page}</div>
					Window Content
				</div>
			</div>
		)
	}
}

export default Selector;