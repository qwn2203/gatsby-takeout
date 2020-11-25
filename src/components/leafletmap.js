import React from 'react'
import PropTypes from 'prop-types'
import { Map, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import './leafletmap.css'
import data from './LocHist.json'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const colorOptions = 'lime'

class LeafletMap extends React.Component {
  constructor(props){
    super(props);
    this.state={
      latlon: [],
      latlonGlobal: [],
      latLonStill: [],
      latLonTilt: [],
      latLonFoot: [],
      latLonUnk: [],
      time: [],
      activ: [],
      pathColor: 'gray'
    };
  }
  
  componentDidMount(){
    var latlon = [];
    var latLonStill = [];
    var latLonTilt = [];
    var latLonFoot = [];
    var latLonUnk = [];
    var time = [];
    var activ = [];
    for(var i = 0; i < 20000; i++){
      var lati=data.locations[i].latitudeE7/10000000;
      var lon=data.locations[i].longitudeE7/10000000;
      //var dat =new Date(data.locations[i].timestampMs);

      if(data.locations[i].activity != null){
        switch (data.locations[i].activity[0].activity[0].type) {
          case 'STILL':
            latLonStill.push([lati,lon]);
          break;
          case 'TILTING':
            latLonTilt.push([lati,lon]);
          break;
          case 'ON_FOOT':
            latLonFoot.push([lati,lon]);
          break;
          case 'UNKNOWN':
            latLonUnk.push([lati,lon]);
          break;
          default:
          break;
        }
        var act=data.locations[i].activity[0].activity[0].type;
      } else {
        latLonUnk.push([lati,lon]);
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
        latlonGlobal: latlon,
        latLonStill: latLonStill,
        latLonTilt: latLonTilt,
        latLonFoot: latLonFoot,
        latLonUnk: latLonUnk,
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
      latlonGlobal,
      latLonStill,
      latLonTilt,
      latLonFoot,
      latLonUnk,
      pathColor,
      time,
      activ
    } = this.state;
  
    const handleChange = (event) => {
      switch (event.target.value) {
        case 'still':
          this.setState({
            latlon: latLonStill,
            pathColor: 'red'
          });
          break;
        case 'tilt':
          this.setState({
            latlon: latLonTilt,
            pathColor: 'green'
          });
          break;
        case 'unkn':
          this.setState({
            latlon: latLonUnk,
            pathColor: 'black'
          });
          break;
        case 'foot':
          this.setState({
            latlon: latLonFoot,
            pathColor: 'blue'
          });
          break;
        case 'all':
            this.setState({
              latlon: latlonGlobal,
              pathColor: 'gray'
            });
            break;
        default:
          break;
      }
      console.log(event.target.value);
    };

      return (
        <div>
          <div class="center" >
            <FormControl >
              <InputLabel id="demo-simple-select-label">Movimiento</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                onChange={handleChange}
              > 
                <MenuItem value={'all'}><em>All</em></MenuItem>
                <MenuItem value={'still'}>Still</MenuItem>
                <MenuItem value={'tilt'}>Tilting</MenuItem>
                <MenuItem value={'unkn'}>Unknown</MenuItem>
                <MenuItem value={'foot'}>On foot</MenuItem>
              </Select>
            </FormControl>
        </div>

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
            color={pathColor} 
            positions={latlon} />
        </Map>
        </div>
      );
  }
}

export default LeafletMap
