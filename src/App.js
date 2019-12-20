import React, { Component } from "react";
import Fetch from "./component/fetch";
// import { google_map_api_key } from "../../model/config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      userAddress: null
    };
  }

  getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getCoordinates);
    } else {
      alert("not supported");
    }
  };

  getCoordinates = position => {
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    // this.reverseGeocoding();
  };

  // reverseGeocoding = () => {
  //   const lat = this.state.latitude;
  //   const lng = this.state.longitude;
  //   fetch(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.google_map_api_key}`
  //   )
  //     .then(response => response.json())
  //     .then(
  //       data => console.log(data)
  //       // this.setState({
  //       //   userAddress: data.results[0].formatted_address
  //       // })
  //     )
  //     .then.catch(error => alert(error));
  // };

  handleLocationError = error => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("denied request");
        break;
      case error.POSSITION_UNAVAILABLE:
        alert("unavailable request");
        break;
      case error.TIMEOUT:
        alert("request timeout");
        break;
      case error.UNKNOWN_ERROR:
        alert("unknown request");
        break;
      default:
        alert("unknown error");
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.getLocation}>Location</button>
        <p>latitude: {this.state.latitude}</p>
        <p>longitude: {this.state.longitude}</p>
        {/* <p>userAddress:{this.state.userAddress}</p> */}
        <p>
          userAddress:
          <Fetch />
        </p>
        {this.state.latitude && this.state.longitude ? (
          <img src={``} alt="" />
        ) : null}
        {/* https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${config.google_map_api_key} */}
      </div>
    );
  }
}
export default App;
