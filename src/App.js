import React, { Component } from 'react'; //** Imports React
import './App.css'; //** Imports App.css
import bathLocationList from './components/bathLocationList'; //** Imports Location data from bath


class App extends Component {
	state = {
	destinations: require('./bathPlaces.json'),
	map: '',
	infoWindow: '',
	prevmapMarker: ''
	};


constructor(props){
	super(props);
	this.initMap= this.initMap.bind(this);
	this.openInfoWindow = this.openInfoWindow.bind(this);
	this.closeInfoWindow = this.closeInfoWindow.bind(this);
	/** https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56 */
    }



componentDidMount() {
	/** https://reactjs.org/docs/react-component.html#componentdidmount */
	window.initMap=this.initMap;
	loadMap(
		/** Place your own google API Key after key = */
		"https://maps.googleapis.com/maps/api/js?key=AIzaSyB8i5Hjadmbk0LX4KsrN67ftqngalc48XU&v=3&callback=initMap"
	);
}


/** Map */
initMap(){
	/** https://developers.google.com/maps/documentation/javascript/tutorial */
	let self=this;
	
	let makeMap= document.getElementById('map');
	makeMap.style.height = window.innerHeight + 'px';
	let map = new window.google.maps.Map(makeMap, {
		/** https://developers.google.com/maps/documentation/javascript/controls  */
		mapTypeControlOptions: {
			style: window.google.maps.MapTypeControlStyle.DEFAULT,
			position: window.google.maps.ControlPosition.BOTTOM_CENTER
		},
	        center: { lat: 43.912949, lng: -69.813771 },
            zoom: 17
    });

/** Street Pano 
	initPano() {
        // Note: constructed panorama objects have visible: true
        // set by default.
        let panoramaView = new window.google.maps.StreetViewPanorama(
            document.getElementById('map'), {
              position: {lat: 43.912949, lng: -69.813771},
              addressControlOptions: {
                position: google.maps.ControlPosition.BOTTOM_CENTER
              },
              linksControl: false,
              panControl: false,
              enableCloseButton: false
        });
      }
	

/** Info Window */
	let InfoWindow = new window.google.maps.InfoWindow({});
	let destinations = [];
/** https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions */
	
	
	window.google.maps.event.addListener(InfoWindow, 'closeclick', function(){
		self.closeInfoWindow();
        });
	
/*updates */
	this.setState({
    map: map,
    InfoWindow: InfoWindow		
    });
	

//** center your map */
	window.google.maps.event.addDomListener(window, 'resize', function(){
	let centered = map.getCenter();
	window.google.maps.event.trigger(map, 'resize');
	self.state.map.setCenter(centered);
	});
	
	window.google.maps.event.addListener(map, 'click', function(){
		self.closeInfoWindow();
	});
	
	this.state.destinations.forEach(function(location) {
		let contact = location.name + location.address;
		let mapMarker = new window.google.maps.Marker({
			position: new window.google.maps.LatLng(
			location.latitude,
			location.longitude,
			),
			animation: window.google.maps.Animation.DROP,
			map:map
		});
/** https://developers.google.com/maps/documentation/javascript/examples/marker-animations  */
	mapMarker.addListener('click', function(){
		self.openInfoWindow(mapMarker);
	});	  
		
			location.contact = contact;
			location.display = true;
			location.mapMarker = mapMarker;
			destinations.push(location);	
	});
	
	this.setState({
		destinations: destinations
	});
}

/** Find out more about location */
	openInfoWindow(mapMarker) {
		this.closeInfoWindow();		
		this.setState({
			prevmapMarker: mapMarker
		});

		mapMarker.setAnimation(window.google.maps.Animation.BOUNCE);
		this.state.infoWindow.setContent('Wait...');
		this.state.infoWindow.open(this.state.map, mapMarker);
		this.foursquareInfo(mapMarker);
	}
	
	closeInfoWindow() {
		if (this.state.prevmapMarker) {
			this.state.prevmapMarker.setAnimation(null);
		}
		this.setState({
			prevmapMarker:''
		});
		 this.state.openInfoWindow.close();
	}

//** Grab data from Foursquare.com about location
	foursquareInfo(mapMarker){
	let self = this;
/** Put your FourSquare Info here */
	let clientId= "K154A23TLZK5ZFVP3WSTUMHJHTA2ZP2JRTVLAUTAZBZATVD2";
	let clientSecret = "SK2RPIYIF1FZZEQH0P5ZTEB0ZT4IGFKG4EFOKNVXQW5OSVNN";
	let url = "https://api.foursquare.com/v2/venues/search?client_id=" + clientId + "&client_secret=" + clientSecret + "&v=20170617&ll=" + mapMarker.getPosition().lat() + "," + mapMarker.getPosition().lng() + "&limit=1";
		
	fetch(url) 
		.then(
		function (response){
			if(response.status !== 200) {
				self.state.infoWindow.setContent('Server-side issue');
				return;
			}
			
		
			response.json().then (function (data) {
				let locationInfo = data.response.venues[0];
				let	locationName = locationInfo.name + '<br>';
				let locationAddress = '<b>Address: </b>' + locationInfo.address +'<br>';
				let moreInfo = '<a href="https://foursquare.com/v/'+ locationInfo.id +'" target="_blank"><b>More information Foursquare Website</b></a>';
				
				self.state.infowindow.setContent(locationName + locationAddress + moreInfo);
			});
		 })
		.catch(function (err) {
		       self.state.infoWindow.setContent('Data cannot be loaded from FourSquare.');
		  });
}


	render(){
		return (
		<div>
			<header className= 'App-header'>
			<h1 className='App-title'>Bath Maine Neighborhood Map</h1>
			</header>
			<bathLocationList 
			key = "10"
			destinations = {this.state.destinations}
			openInfoWindow = {this.openInfoWindow}
			closeInfoWindow = {this.closeInfoWindow}
			/>
			<div id="map" aria-labelledby='application' aria-label="Map with Bath destinations" tabIndex='4'/>
			</div>
			);
		}
	}
			
export default App;

/** load map */

function loadMap(mapURL) {
	let ref = window.document.getElementsByTagName("script")[0];
	let script = window.document.createElement("script");
	script.src = mapURL;
	script.async = true;
	script.onerror = function() {
		document.write("Google Maps failed to load");
	};
	ref.parentNode.insertBefore(script, ref);	
}




