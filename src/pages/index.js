import React from "react"
import Layout from "../components/layout"
import LeafletMap from "../components/leafletmap"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function IndexPage(){
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
  <Layout>
    {typeof window !== 'undefined' &&
        <LeafletMap
          position={[19.4978,-99.1269]}
          zoom={5}
        />
    }
  </Layout>
  )
}
