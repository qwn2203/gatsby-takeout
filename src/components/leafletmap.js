import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import './leafletmap.css'
import data from './LocHist.json'

const polyline = [
  [19.04334, -98.20193],
  [19.4978,-99.1269],
  [19.18095, -96.1429],
]
const limeOptions = { color: 'lime' }

class LeafletMap extends React.Component {
  constructor(props){
    super(props);
    this.state={
      latitud: [],
      longitud: [],
      time: [],
      activity: []
    };
  }
  

  componentDidMount(){
    var lat = [];
    //var long = [];
    //var time = [];
    //var activ = [];
    //console.log(data.locations[0].latitudeE7);
    for(var i = 0; i<10; i++){
      var lati=data.locations[i].latitudeE7/10000000;
      console.log(lati);
      //lat.push(data.locations[i].latitudE7);
    }
    //console.log(lat);
  }
  static propTypes = {
    /** Latitude and Longitude of the map centre in an array, eg [51, -1] **/
    position: PropTypes.array,

    /** Initial zoom level for the map (default 13) **/
    zoom: PropTypes.number,

    /** If set, will display a marker, which when clicked will display this text **/
    markerText: PropTypes.string
  }

  static defaultProps = {
    
    position: [19.4978,-99.1269],
    zoom: 5,
    markerText: ""
  }

  render() {
    
      return (
        
        <Map center={this.props.position} zoom={this.props.zoom}>
          <TileLayer
            url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          />
          {this.props.markerText !== "" &&
          <Marker position={this.props.position}>
            <Popup>{this.props.markerText}</Popup>
          </Marker>
          }
          <Polyline pathOptions={limeOptions} positions={polyline} />
        </Map>
      );
  }
}

export default LeafletMap
