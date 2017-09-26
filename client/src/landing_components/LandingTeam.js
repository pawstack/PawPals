import React from 'react';
import '../../../public/componentCSS/landing.css';


class LandingTeam extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container icon-container team-main-container">

          <div className="row team-container">

          <div className="col-md-6">
              <img src="https://i.imgur.com/5W2eCj2.png" className='team-icon'></img>
              <div className='icon-title'>
                Young Lu
                <span className='contact-icon-span'><a href="https://www.linkedin.com/in/yanglu3/"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img" alt="linkedin"></img></a></span>
                <span className='contact-icon-span'><a href="https://github.com/youngyanglu"><img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img" alt="github"></img></a></span>
              </div>
              <div className='team-text'>
                Economist turned software engineer looking for inefficiencies to fix.
              </div>
            </div>


            <div className="col-md-6">
              <img src="https://i.imgur.com/csArLVO.png" className='team-icon'></img>
              <div className='icon-title'>
                Tiffany Choy
                <span className='contact-icon-span'><a href="https://www.linkedin.com/in/tiffany-choy/"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img" alt="linkedin"></img></a></span>
                <span className='contact-icon-span'><a href="https://github.com/tiffanycchoy"><img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img" alt="github"></img></a></span>
              </div>
              <div className='team-text'>
                Passionate about technology that connects people in their every day lives.
              </div>
            </div>

          </div>


          <div className="row team-container">

            <div className="col-md-6">
              <img src="https://i.imgur.com/0yH6RXp.jpg" className='team-icon'></img>
              <div className='icon-title'>
                Martin Chang
                <span className='contact-icon-span'><a href="https://www.linkedin.com/in/martinkchang/"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img" alt="linkedin"></img></a></span>
                <span className='contact-icon-span'><a href="https://github.com/mkchang"><img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img" alt="github"></img></a></span>
              </div>
              <div className='team-text'>
                Energy enthusiast, excited to build technologies that leverage data in interesting ways.
              </div>
            </div>

            <div className="col-md-6"><img src="https://i.imgur.com/v7StMZS.jpg" className='team-icon'></img>
              <div className='icon-title'>
                Nova Qiu
                <span className='contact-icon-span'><a href="https://www.linkedin.com/in/noqiu/"><img src="https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/linkedin-256.png" className="contact-icon-img" alt="linkedin"></img></a></span>
                <span className='contact-icon-span'><a href="https://github.com/novyQ"><img src="https://mapbox.github.io/mapbox-gl-native/macos/0.5.0/img/github.svg" className="contact-icon-img" alt="github"></img></a></span>
              </div>
              <div className='team-text'>
                Loves creating interaction and user experience, and bringing design to life.
              </div>
            </div>
          </div>

        </div>

    );

  }

}

export default LandingTeam;