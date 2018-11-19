import React, { Component } from 'react'; //** Imports React
import './App.css'; //** Imports App.css
import LocationList from './components/LocationList'; //** Imports Location data from bath

class App extends Component {


constructor(props){
	super(props);
	this.state = {
	'places': require('./bathPlaces.json'),
	//** JSON file
	'map': '',
	'infoWindow': '',
	'prevMarker': ''
	};

	this.initMap= this.initMap.bind(this);
	this.openInfoWindow = this.openInfoWindow.bind(this);
	this.closeInfoWindow = this.closeInfoWindow.bind(this);
	/** https://medium.freecodecamp.org/react-binding-patterns-5-approaches-for-handling-this-92c651b5af56 */
    }



componentDidMount() {
	/** https://reactjs.org/docs/react-component.html#componentdidmount */
	window.initMap = this.initMap;
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
      zoom: 15,
//** https://developers.google.com/maps/documentation/javascript/styling **//
			styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
              featureType: 'administrative.locality',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'geometry',
              stylers: [{color: '#263c3f'}]
            },
            {
              featureType: 'poi.park',
              elementType: 'labels.text.fill',
              stylers: [{color: '#6b9a76'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry',
              stylers: [{color: '#38414e'}]
            },
            {
              featureType: 'road',
              elementType: 'geometry.stroke',
              stylers: [{color: '#212a37'}]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{color: '#9ca5b3'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry',
              stylers: [{color: '#746855'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'geometry.stroke',
              stylers: [{color: '#1f2835'}]
            },
            {
              featureType: 'road.highway',
              elementType: 'labels.text.fill',
              stylers: [{color: '#f3d19c'}]
            },
            {
              featureType: 'transit',
              elementType: 'geometry',
              stylers: [{color: '#2f3948'}]
            },
            {
              featureType: 'transit.station',
              elementType: 'labels.text.fill',
              stylers: [{color: '#d59563'}]
            },
            {
              featureType: 'water',
              elementType: 'geometry',
              stylers: [{color: '#17263c'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{color: '#515c6d'}]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{color: '#17263c'}]
            }
          ]
    });

/** Street Pano
	initPano() {

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
let places = [];
/** https://developers.google.com/maps/documentation/javascript/reference/info-window#InfoWindowOptions */


window.google.maps.event.addListener(InfoWindow, 'closeclick', function() {
		self.closeInfoWindow();
 });

/*updates */
this.setState({
    map: map,
    infoWindow: InfoWindow
 });


//** center your map */
window.google.maps.event.addDomListener(window, 'resize', function() {
	let center = map.getCenter();
	window.google.maps.event.trigger(map, 'resize');
	self.state.map.setCenter(center);
	});

	window.google.maps.event.addListener(map, 'click', function() {
		self.closeInfoWindow();
	});


	this.state.places.forEach(function(location){
		let placeName = location.name ;
		let marker = new window.google.maps.Marker({
			position: new window.google.maps.LatLng(
			location.lat,
			location.lng,
			),
			animation: window.google.maps.Animation.DROP,
			map:map,
			title: location.name
 });
/** https://developers.google.com/maps/documentation/javascript/examples/marker-animations  */
	marker.addListener('click', function() {
		self.openInfoWindow(marker);
	});

			location.placeName = placeName;
		  location.marker = marker;
			location.display = true;
			places.push(location);
	});

	this.setState({
		places: places
	});
}

/** Find out more about location */
	openInfoWindow(marker) {
		this.closeInfoWindow();
		this.setState({
		prevMarker: marker
		});

		marker.setAnimation(window.google.maps.Animation.BOUNCE);
		this.state.infoWindow.setContent('Wait...');
		this.state.map.setCenter(marker.getPosition());
    this.state.map.panBy(0, - 100);
		this.state.infoWindow.open(this.state.map, marker);
		this.foursquareInfo(marker);
	}

	closeInfoWindow() {
		if (this.state.prevMarker) {
			this.state.prevMarker.setAnimation(null);
		}
		this.setState({
			prevMarker:''
		});

		 this.state.infoWindow.close();
	}

//** Grab data from Foursquare.com about location
	foursquareInfo(marker){
	let self = this;
/** Put your FourSquare Info here */
	let fsClientId= "K154A23TLZK5ZFVP3WSTUMHJHTA2ZP2JRTVLAUTAZBZATVD2";
	let fsClientSecret = "SK2RPIYIF1FZZEQH0P5ZTEB0ZT4IGFKG4EFOKNVXQW5OSVNN";
	let fsUrl = "https://api.foursquare.com/v2/venues/search?client_id=" + fsClientId + "&client_secret=" + fsClientSecret + "&v=20180612&ll=" + marker.getPosition().lat() + "," + marker.getPosition().lng() + "&limit=1";

	fetch(fsUrl)
		.then(
		function(response){
			if(response.status !== 200) {
				self.state.infowindow.setContent('Server-side issue');

				return;
			}
//** https://developers.google.com/maps/documentation/javascript/reference/info-window *//
			response.json().then (function (data) {
				let locationInfo = data.response.venues[0];
				let	location = `<h4>${locationInfo.name}</h4>`;
				let address =`<h4>Address: ${locationInfo.location.address}</h4>`;
				let moreInfo = '<a href="https://foursquare.com/v/'+ locationInfo.id +'" target="_blank"><b> Visit Foursquare for reviews! </b></a>';
				self.state.infoWindow.setContent(location + address + moreInfo);
			});
		}
	)
		.catch(function (err) {
		       self.state.infoWindow.setContent('<h4>Data cannot be loaded from FourSquare.</h4>');
		  });
}


	render(){
		return (
		<div>
			<header className= 'Map-header'>
			<h1 className='Map-title'>Bath Maine Neighborhood Map</h1>
			<h2 className='Bath-url'><a href="https://visitbath.com/" target="_blank">Visit City of Bath</a></h2>
			</header>
			<LocationList
				key = "100"
				places = {this.state.places}
				openInfoWindow = {this.openInfoWindow}
				closeInfoWindow = {this.closeInfoWindow}
			/>
			<div id="map" aria-labelledby='application' aria-label="Map of City of Bath" tabIndex='4'></div>
			</div>
			);
		}
	}

export default App;

/** load map */

function loadMap(mapURL) {
	let ref = window.document.getElementsByTagName('script')[0];
	let script = window.document.createElement('script');
	script.src = mapURL;
	script.async = true;
	script.onerror = function() {
		document.write('Google Maps failed to load. Reload or Check network connection');
	};
	ref.parentNode.insertBefore(script, ref);
}
