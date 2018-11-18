import React from 'react';

class Location extends React.Component {
  render() {
    return (
      <li
        className="place"
        role="button"
        tabIndex="0"
        onKeyPress={this.props.openInfoWindow.bind(
          this,
          this.props.data.marker
        )}
        onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}
      >
        {this.props.data.placeName}
      </li>
    );
  }
}

export default Location;
