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

filterLocations(event) {
	this.props.closeInfoWindow();
	const {value} = event.target;
	let locations = [];
	this.props.destinations.forEach(function(location){
		if (location.longname.toLowerCase().indexOf(value.toLowerCase())>=0){
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
	let destinationList = this.state.locations.map((listIte))
}


}
