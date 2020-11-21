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
    var latlon = [];
    var utcSeconds = 1234567890;
    //var time = [];
    //var activ = [];
    for(var i = 0; i<10; i++){
      var lati=data.locations[i].latitudeE7/10000000;
      var lon=data.locations[i].longitudeE7/10000000;
      var dat =data.locations[i].timestampMs;
      if(data.locations[i].activity != null){
        var act=data.locations[i].activity[0];
      }else{
        act = 'null';
      }
      
      latlon.push([lati,lon]);

      //var d = new Date(dat);
      //var date = d.setUTCSeconds(utcSeconds);
      console.log(act);
    }
    //console.log(latlon);
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
