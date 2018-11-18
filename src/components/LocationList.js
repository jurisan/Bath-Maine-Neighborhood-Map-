import React, { Component } from 'react';
import Location from './Location';

class LocationList extends Component {

state = {
	locations: '',
	query:'',
	suggestions: true
};

constructor(props) {
    super(props);
    // bind original method context
    this.filterLocations = this.filterLocations.bind(this);
  }

	/** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind */
filterLocations(event) {
		this.props.closeInfoWindow();
		const {value} = event.target;
		let locations = [];
		this.props.places.forEach(function(location){
			if (location.placeName.toLowerCase().indexOf(value.toLowerCase())>=0){
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

componentWillMount() {
	this.setState({
		locations: this.props.places
	});
}


//* list of my Destinations
render() {
	let destinationlist = this.state.locations.map((listItem, index) => {
		return (
			<Location
			key = {index}
		openInfoWindow = {this.props.openInfoWindow.bind(this)}
	    data = {listItem}
		/>
		);
},this);

return (
		  <div className= "search-box" id="search-box">
			<input
			className="search-textbox"
			role= "search"
	    aria-labelledby="filter"
			type="text"
			placeholder="Filter"
			value={this.state.query}
			onChange={this.filterLocations}
			/>
		<ul className="list-container">
			{destinationlist}
		</ul>
		</div>
		);
	}
}

export default LocationList;
