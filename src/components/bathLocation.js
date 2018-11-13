import React from 'react';

class bathLocation extends React.Component {
  render() {
    return (
      <li
        className="destinations"
        role="button"
        tabIndex="0"
        onKeyPress={this.props.openInfoWindow.bind(
          this,
          this.props.data.marker
        )}
        onClick={this.props.openInfoWindow.bind(this, this.props.data.marker)}
      >
        {this.props.data.contact}
      </li>
    );
  }
}

export default bathLocation;
