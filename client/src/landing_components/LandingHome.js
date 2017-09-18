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
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import $ from 'jquery';


class LandingHome extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    return(
    <div>
        <div className="slogan">
          <div>
           Don't put your life on PAWse
          </div>
          <div>
           Let us walk your dogs for you!
          </div>
        </div>

        <div style={{marginLeft:"10%", marginTop:"5%"}}>
          <img src="http://media.socastsrm.com/wordpress/wp-content/blogs.dir/51/files/2017/08/Walking-Dogs-event.jpg" style={{'marginTop':'-5px','width':'80vw'}}></img>
        </div>

        <div className="container icon-container">
          <div className="row">
            <div className="col-sm-3"><img src="https://cdn0.iconfinder.com/data/icons/time-icons-rounded/110/Calendar-Time-512.png" className='landing-icon'></img>
              <div className='icon-title'>Schedule</div>
              <div className='icon-text'>
                Calender system to easily schedule and book walks.
              </div>
            </div>

            <div className="col-sm-3"><img src="https://image.flaticon.com/icons/svg/237/237066.svg" className='landing-icon'></img>
              <div className='icon-title'>Pay</div>
              <div className='icon-text'>
                Make and receive payment securely through the app.
              </div>
            </div>

            <div className="col-sm-3"><img src="https://image.flaticon.com/icons/svg/235/235861.svg" className='landing-icon'></img>
              <div className='icon-title'>Track</div>
              <div className='icon-text'>
                Real time tracking of dog during the walk.
              </div>
            </div>

            <div className="col-sm-3">
              <img src="https://i.pinimg.com/originals/83/58/1c/83581c5e0cb7d83fee4a2e44083637a2.png" className='landing-icon'>
              </img>
              <div className='icon-title'>Chat</div>
              <div className='icon-text'>
                Instant chat in app for users for smooth communication.
              </div>
            </div>

          </div>
        </div>

        <div className='demo-container-blue'>
            <div className='demo-text col-sm-6'>
              <div className ='demo-title'>
                Demo Number One
              </div>
              <div><br></br></div>
              <div className='demo-para'>
                You can't always predict a crazy day at work, but you can anticipate your dog's needs. Instead of rushing home at lunch, book a dog walker to give your dog a 30-minute dog walk.
              </div>
            </div>
            <div className='col-sm-6'>GIF DEMO</div>
        </div>

        <div className='demo-container-white'>
          <div className='col-sm-6'>GIF DEMO</div>
          <div className='demo-text col-sm-6'>
              <div className ='demo-title'>
                Demo Number Two
              </div>
              <div><br></br></div>
              <div className='demo-para'>
                You can't always predict a crazy day at work, but you can anticipate your dog's needs. Instead of rushing home at lunch, book a dog walker to give your dog a 30-minute dog walk.
              </div>
            </div>
        </div>

        <div className='demo-container-blue'>
          <div className='demo-text col-sm-6'>
              <div className ='demo-title'>
                Demo Number Three
              </div>
              <div><br></br></div>
              <div className='demo-para'>
                You can't always predict a crazy day at work, but you can anticipate your dog's needs. Instead of rushing home at lunch, book a dog walker to give your dog a 30-minute dog walk.
              </div>
          </div>
          <div className='col-sm-6'>GIF DEMO</div>
        </div>

        <div className='demo-container-white'>
          <div className='col-sm-6'>GIF DEMO</div>
          <div className='demo-text col-sm-6'>
              <div className ='demo-title'>
                Demo Number Four
              </div>
              <div><br></br></div>
              <div className='demo-para'>
                You can't always predict a crazy day at work, but you can anticipate your dog's needs. Instead of rushing home at lunch, book a dog walker to give your dog a 30-minute dog walk.
              </div>
            </div>
        </div>

    </div>
  )
  }

}

export default LandingHome;