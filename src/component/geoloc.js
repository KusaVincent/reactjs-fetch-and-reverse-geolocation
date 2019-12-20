import React, { Component } from "react";
// import Config from "../../model/config";
import { geolocated } from "react-geolocated";
import Geocoder from "react-native-geocoding";
import {google_map_api_key} from "../../model/config"

const con = new Config();

class Position extends Component {
  getLatLng = (latitude, longitude) => {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <table>
        <tbody>
          <tr>
            <td>latitude</td>
            <td>{this.props.coords.latitude}</td>
          </tr>
          <tr>
            <td>longitude</td>
            <td>{this.props.coords.longitude}</td>
          </tr>
        </tbody>
      </table>
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  };
  getData = () => {
    const lat = -1.4458843; //this.getLatLng.longitude;
    const lng = 37.0503727; //this.getLatLng.latitude;
    Geocoder.init(
    //  replace with your own
    );
    Geocoder.from(lat, lng)
      .then(json => {
        var addressComponent = json.results[0].address_components;
        return addressComponent;
      })
      .catch(error => console.warn(error));
  };
  render() {
    return <div>{this.getData()}</div>;
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Position);
