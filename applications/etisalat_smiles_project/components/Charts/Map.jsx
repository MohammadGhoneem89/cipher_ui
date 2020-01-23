// JavaScript source code
/* global google */

import React from "react";
import {
    withGoogleMap,
    GoogleMap,
    withScriptjs,
    Marker
} from "react-google-maps";

var mylat = null;
var mylng = null;

class Map extends React.Component {
    state = {
        places: [...this.props.prelocation],
        fixedLocations: []

    };

    addMarker(e) {
        if(this.props.disabled) {
            return
        }
        console.log("The Latitude is " + e.latLng.lat());
        console.log("The Longitude is " + e.latLng.lng());
        mylat = e.latLng.lat();
        mylng = e.latLng.lng();
        const newPlace = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
        };

        let correctedCoords = {
            lat : newPlace.lat,
            lng : newPlace.lng
        }

        this.props.updateState({correctedCoords})

        this.setState({
            places: [...this.props.prelocation, newPlace],
        });
    }

    render() {
        var lt = mylat;
        var lg = mylng;
        return (
            <div>
                    <GoogleMap
                        onClick={this.addMarker.bind(this)}
                        defaultZoom={this.props.zoom}
                        defaultCenter={this.props.center}
                    >
                        {this.state.places.map(place => {
                            return (
                                <Marker
                                    icon={{ url: place.id === 0 ? "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png" : place.id === 1 ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png" : "http://maps.google.com/mapfiles/ms/icons/red-dot.png" }}
                                    key={place.id}
                                    position={{ lat: place.lat, lng: place.lng }}
                                />
                            );
                        })}
                    </GoogleMap>
                <br />
                </div>
        );
    }
}

export default withScriptjs(withGoogleMap(Map));
