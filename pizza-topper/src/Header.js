import React from 'react';

function Header(){

	return(
		<div className="header">
			<select>
			  <option value="volvo">Dominos</option>
			  <option value="saab">Pizza Pizza</option>
			  <option value="mercedes">Pizza Hut</option>
			  <option value="audi">Papa John's</option>
			</select>
		</div>
	)
}

export default Header;