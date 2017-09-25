import React from 'react';
import '../../../public/componentCSS/landing.css';

class LandingHome extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
        <div className="slogan">
          <div>
            Don't put your life on <i> paws </i>
          </div>
          <div>
           Let us walk your dogs for you!
          </div>
        </div>

        <div className="dog-walking-container">
          <img src="http://media.socastsrm.com/wordpress/wp-content/blogs.dir/51/files/2017/08/Walking-Dogs-event.jpg" className="dog-walking-img"></img>
        </div>

        <div className="circular-icon-container">
          <div className="row">
            <div className="col-sm-3">
              <img src="https://cdn0.iconfinder.com/data/icons/time-icons-rounded/110/Calendar-Time-512.png" className='landing-icon'>
              </img>
              <div className='icon-title'>Schedule</div>
              <div className='icon-text'>
                Easily schedule and book walks in our calendar.
              </div>
            </div>

            <div className="col-sm-3"><img src="https://image.flaticon.com/icons/svg/237/237066.svg" className='landing-icon'></img>
              <div className='icon-title'>Pay</div>
              <div className='icon-text'>
                Securely make payments through the app.
              </div>
            </div>

            <div className="col-sm-3"><img src="https://image.flaticon.com/icons/svg/235/235861.svg" className='landing-icon'></img>
              <div className='icon-title'>Track</div>
              <div className='icon-text'>
                Real time tracking of your dog during the walk.
              </div>
            </div>

            <div className="col-sm-3">
              <img src="https://i.pinimg.com/originals/83/58/1c/83581c5e0cb7d83fee4a2e44083637a2.png" className='landing-icon'>
              </img>
              <div className='icon-title'>Chat</div>
              <div className='icon-text'>
                Instantly chat in app with your dog walker.
              </div>
            </div>

          </div>
        </div>

         <div className="container">

          <div className='row demo-container-blue'>

            <div className='col-md-6 col-sm-3 col-xs-12 pull-right video-container'>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/RbWOvDQzF0s?autoplay=1&loop=1&playlist=RbWOvDQzF0s" allowFullScreen></iframe>
              </div>
            </div>

            <div className='demo-text col-md-6 col-sm-9 col-xs-12 pull-left'>
              <div className ='demo-title'>
                  Simple Scheduling
              </div>
              <div><br></br></div>
              <div className='demo-para'>
                As a dog walker, our calendar interface lets you create shifts in just a few clicks. We’ll match you with dogs in your neighborhood in no time.
              </div>
            </div>

          </div>


          <div className='row demo-container-white'>

            <div className='col-md-6 col-sm-3 col-xs-12 pull-left video-container' >
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/tCxH4x5zbvQ?autoplay=1&loop=1&playlist=tCxH4x5zbvQ" allowFullScreen></iframe>
              </div>
            </div>

            <div className='demo-text col-md-6 col-sm-9 col-xs-12 pull-right'>
              <div className ='demo-title'>
                Filter, Book and Pay!
              </div>
              <div><br></br></div>
              <div className='demo-para'>
                As a dog owner, you can find a dog walker that fits all your criteria. Book and pay instantly. Even better, you can choose walks between 30 minutes and 2 hours for your dog’s next adventure.
              </div>
            </div>
          </div>


          <div className="row demo-container-blue">

              <div className='col-md-6 col-sm-3 col-xs-12 pull-right video-container'>
                <div className="embed-responsive embed-responsive-16by9">
                  <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/I0aVDuCb9pM?autoplay=1&loop=1&playlist=I0aVDuCb9pM" allowFullScreen></iframe>
                </div>
              </div>

              <div className='demo-text col-md-6 col-sm-9 col-xs-12 pull-left'>
                <div className ='demo-title'>
                  Where’s my dog?
                </div>
                <div><br></br></div>
                <div className='demo-para'>
                 Rest easy, you’ll always know where your dog is with our real-time tracking. If you want to check which lampposts they sniffed after the walk, we store all historical walk paths for you.
                </div>
              </div>

          </div>



          <div className='row demo-container-white'>

            <div className='col-md-6 col-sm-3 col-xs-12 pull-left video-container'>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/0VL0wstp2KM?autoplay=1&loop=1&playlist=0VL0wstp2KM" allowFullScreen></iframe>
              </div>
            </div>

            <div className='demo-text col-md-6 col-sm-9 col-xs-12 pull-right'>
              <div className ='demo-title'>
                I forgot to tell you!
              </div>
              <div><br></br></div>
              <div className='demo-para'>
                No worries, instant messaging between dog owners and dog walkers means you can get in touch anytime.
              </div>
            </div>

          </div>

      </div>

      </div>
    );
  }

}

export default LandingHome;

 /*<div className="embed-responsive embed-responsive-16by9">
              <iframe src="https://www.youtube.com/embed/zsTEy4RR1S4?ecver=2?autoplay=1&loop=1" className="embed-responsive-item" allowFullScreen>
              </iframe>
            </div>*/
