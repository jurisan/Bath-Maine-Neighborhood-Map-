import React, { Component } from 'react';
import bathLocation from './bathLocation';

class bathLocationList extends Component {
	state={
		locations: '',
		query: '',
		suggestions: true
	};

constructor(props) {
	super(props); /** http://cheng.logdown.com/posts/2016/03/26/683329 */
	this.filterLocations = this.filterLocations.bind(this);
	/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind */
}

filterDestinations(event) {
	this.props.closeInfoWindow();
	const {value} = event.target;
	let locations = [];
	this.props.destinations.forEach(function(location){
		if (location.contact.toLowerCase().indexOf(value.toLowerCase())>=0){
			location.marker.setVisible(true);
			locations.push(location);
		}else{
			location.marker.setVisible(false);
		}
	});
	
	this.setState({
		locations: locations,
		query: value
	});
}

ComponentWillMount() {
	this.setState({
		locations: this.props.destinations
	});
}


//* list of my Destinations
render() {
	let destinationList = this.state.locations.map(function(bathLocationList, index){
		return (<
		bathLocation key = {index}
		openInfoWindow = {this.props.openInfoWindow.bind(this)}
	    data = {bathLocationList}
		/>
		);
},this);

return (<
		  div className= "search-field" id="search-box">
			<input 
			className="search-textbox"		
			role= "search"
	    aria-labelledby="search-box"
			type="text"
			placeholder="Search Bath, Maine"
			value={this.state.query}		
			onChange={this.filterDestinations}	
			/>
		<ul className="search-items">		
			{destinationList}
		</ul>
		</div>																						 
		);
	}
}

export default bathLocationList; 

