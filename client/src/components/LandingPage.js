import React from 'react';
import ReactDom from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import moment from 'moment';
import Snackbar from 'material-ui/Snackbar';
import FindMyDogMap from './FindMyDogMap';
import Message from './Message';
import Messages from './Messages';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';
//import '../../../public/style.css';

class LandingPage extends React.Component {


  render() {

    return (
      <div>
        <div style={{
          "position":"absolute",
          "marginTop":"-8px",
          "marginLeft":"8%",
          "float":"left"}}>
          <img src="http://www.clker.com/cliparts/H/9/a/4/b/O/gold-paw-md.png" style={{"width":"110px"}}></img>
        </div>
        <div style={{
          "position":"relative",
          "textAlign":"center",
          "fontSize":'140px',
          "color":'orange',
          "marginTop":"80px",
        }} className="title">
        PawPals
        </div>
        <div style={{
          "position":"relative",
          "textAlign":"center",
          "fontSize":'35px',
          "fontWeight":'bold',
          "color":'orange',
        }} className="landingsubtitle">
        We are the Best Friend of Your Best Friend
        </div>
        <div style={{
          "width":'55%',
          "margin": "0 auto",
          "marginTop":"60px"}}>
          <img src="https://media.giphy.com/media/kAAdr7NEDLOqQ/giphy.gif" ></img>
        </div>
      </div>
    )
  }
}

export default LandingPage;

