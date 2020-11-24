import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import './leafletmap.css'
import data from './LocHist.json'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
      latlon: [],
      time: [],
      activ: [],
      movement: ''
    };
  }
  

  componentDidMount(){
    var latlon = [];
    var time = [];
    var activ = [];
    for(var i = 0; i < 20000; i++){
      var lati=data.locations[i].latitudeE7/10000000;
      var lon=data.locations[i].longitudeE7/10000000;
      //var dat =new Date(data.locations[i].timestampMs);
      if(data.locations[i].activity != null){
        var act=data.locations[i].activity[0].activity[0].type;
      }else{
        act = 'null';
      }
      var date = new Date(+data.locations[i].timestampMs);
      var formatDate = ("0" + date.getDate()).slice(-2) + '-' + ("0" + (date.getMonth()+1)).slice(-2) + '-' + date.getFullYear()

      latlon.push([lati,lon]);
      activ.push(act);
      time.push(formatDate);
      //var d = new Date(dat);
      //var date = d.setUTCSeconds(utcSeconds);
      this.setState({
        latlon: latlon,
        activ: activ,
        time: time
      });
    }
    //console.log("hola");
    //console.log(this.state.latlon);
    //console.log(latlon);
    //console.log(time);
    console.log(activ);
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
    const {
      latlon,
      time,
      activ,
      movement
    } = this.state;
      return (
        <div>
          <FormControl >
            <InputLabel id="demo-simple-select-label">Movimiento</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              //onChange={handleChange}
            >
              <MenuItem key={'still'}>Still</MenuItem>
              <MenuItem key={'tilt'}>Tilting</MenuItem>
              <MenuItem key={'unkn'}>Unknown</MenuItem>
              <MenuItem key={'foot'}>On foot</MenuItem>
            </Select>
          </FormControl>

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
          <Polyline 
            pathOptions={limeOptions} 
            color={'lime'} 
            positions={latlon} />
        </Map>
        <button onClick={
          console.log(latlon)
        }>hola</button>
        </div>
      );
  }
}

export default LeafletMap
