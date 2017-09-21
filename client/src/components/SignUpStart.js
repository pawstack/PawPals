import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Snackbar from 'material-ui/Snackbar';
import SignUpDataEntry from './SignUpDataEntry';
import OwnerRegister from './OwnerRegister';
import WalkerRegister from './WalkerRegister';
import Payment from './Payment.jsx';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import '../../../public/componentCSS/sign_up_start.css';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#66BB6A',
    pickerHeaderColor: '#66BB6A'
  },
});

class SignUpStart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userFullName: '',
      userEmail: '',
      userGooglePic: '',
      finished: false,
      stepIndex: 0,
      owner: true,
      walker: false,
      phone: '',
      address: '',
      dogName: '',
      dogAge: 0,
      dogBreed: '',
      dogWeight: 0,
      dogPicURL: '',
      dogAboutMe: '',
      walkerAboutMe: ''
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleEntriesChanged = this.handleEntriesChanged.bind(this);
    this.updateUserType = this.updateUserType.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleOwnerSubmit = this.handleOwnerSubmit.bind(this);
    this.handleWalkerSubmit = this.handleWalkerSubmit.bind(this);
    this.validateFormData = this.validateFormData.bind(this);
    this.retrieveUserGoogleInfo = this.retrieveUserGoogleInfo.bind(this);
  }

  handleNext() {
    const {stepIndex} = this.state;
    if (this.state.stepIndex === 1 && this.state.owner) {
      this.handleOwnerSubmit();
    }

    if (this.state.stepIndex === 1 && this.state.walker) {
      this.handleWalkerSubmit();
    }

    if (this.state.stepIndex === 0) {
      this.setState({
        stepIndex: stepIndex + 1
      });
    }
  }

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  }

  validateFormData() {
    var args = Array.prototype.slice.call(arguments);
    var completed = true;
    args.forEach((item) => {
      if (this.state[item] === '' || this.state[item] === null || this.state[item] === undefined) {
        completed = false;
      }
    });
    return completed;
  }


  handleEntriesChanged(valueType, value) {
    this.setState({
      [valueType]: value
    });
  }

  updateUserType(type) {

    this.setState({
      owner: false,
      walker: false
    }, () => {
      (type === 'Owner' ? this.setState({owner: true}) : this.setState({walker: true}));
    });
  }

  handleOwnerSubmit() {
    if (!this.validateFormData('phone', 'address', 'dogName', 'dogAge', 'dogBreed', 'dogWeight', 'dogAboutMe')) {
      alert('please complete profile');
    } else {
      this.setState({
        stepIndex: this.state.stepIndex + 1
      });
      $.ajax({
        url: '/api/signup/owner',
        type: 'POST',
        data: {
          owner: this.state.owner,
          walker: this.state.walker,
          dogName: this.state.dogName,
          dogAge: this.state.dogAge,
          dogBreed: this.state.dogBreed,
          dogWeight: this.state.dogWeight,
          dogPicURL: this.state.dogPicURL,
          dogAboutMe: this.state.dogAboutMe,
          phone: this.state.phone,
          address: this.state.address
        },
        success: (data) => {
        },
        error: function(err) {
          console.log('error sending data to db ', err);
        }
      });
    }
  }


  handleWalkerSubmit() {
    if (!this.validateFormData('phone', 'address', 'walkerAboutMe')) {
      alert('please complete profile');
    } else {
      this.setState({
        stepIndex: this.state.stepIndex + 1
      });
      $.ajax({
        url: '/api/signup/walker',
        type: 'POST',
        data: {
          userGooglePic: this.state.userGooglePic,
          walkerAboutMe: this.state.walkerAboutMe,
          phone: this.state.phone,
          address: this.state.address
        },
        success: (res) => {
        },
        error: function(data) {
        }
      });
    }
  }

  retrieveUserGoogleInfo() {
    $.ajax({
      method: 'GET',
      url: '/api/profile/owner',
      context: this,
      success(data) {
        this.setState({
          userFullName: data[0].display,
          userEmail: data[0].email,
          userGooglePic: data[0].profile_pic
        });
      },
      error(err) {
        console.log('error retrieving user info');
      }
    });
  }

  getStepContent(stepIndex) {
    switch (stepIndex) {
    case 0:
      return (
        <SignUpDataEntry
          address={this.state.address}
          updateUserType = {this.updateUserType}
          entriesChanged = {this.handleEntriesChanged}
          owner = {this.state.owner}
        />
      );
    case 1:
      if (this.state.owner) {
        return (
          <OwnerRegister
            phoneInfo = {this.state.phone}
            address = {this.state.address}
            entriesChanged = {this.handleEntriesChanged}
            dogAge = {this.state.dogAge}
            dogWeight = {this.state.dogWeight}
            dogPicURL = {this.state.dogPicURL}
            userFullName = {this.state.userFullName}
            userEmail = {this.state.userEmail}
            userGooglePic = {this.state.userGooglePic}
          />
        );
      } else if (this.state.walker) {
        return (
          <WalkerRegister
            phoneInfo = {this.state.phone}
            address = {this.state.address}
            entriesChanged = {this.handleEntriesChanged}
            userFullName = {this.state.userFullName}
            userEmail = {this.state.userEmail}
            userGooglePic = {this.state.userGooglePic}
          />);
      }
    default:
      return (
        <div>
          <Snackbar
            open={true}
            message="Your profile has been submitted!"
            autoHideDuration={2000}
            onRequestClose={this.handleRequestClose}
          />
          <Payment />
        </div>
      );
    }
  }

  componentDidMount() {
    this.retrieveUserGoogleInfo();
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="stepper-container">
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel style={{'fontSize':'20'}}>Select an owner or walker account</StepLabel>
            </Step>
            <Step>
              <StepLabel style={{'fontSize':'20'}}>Complete your profile</StepLabel>
            </Step>
            <Step>
              <StepLabel style={{'fontSize':'20'}}>Setup Payment</StepLabel>
            </Step>
          </Stepper>
          <div className="btn-container-main">
            <div>
              <div>{this.getStepContent(stepIndex)}</div>
              <div className="btn-container">
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  className="back-btn"
                />
                {stepIndex < 2 ? (
                  <RaisedButton
                    label = 'Next'
                    primary = {true}
                    onClick = {this.handleNext}
                  />
                ) : (<div></div>)}
              </div>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SignUpStart;
//const contentStyle = {margin: '0 16px'};
//style={contentStyle}
