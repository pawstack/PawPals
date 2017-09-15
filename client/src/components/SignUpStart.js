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
import SignUpDataEntry from './SignUpDataEntry';
import OwnerRegister from './OwnerRegister';
import WalkerRegister from './WalkerRegister';
import Payment from './Payment.jsx';

class SignUpStart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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

    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleEntriesChanged = this.handleEntriesChanged.bind(this);
    this.updateUserType = this.updateUserType.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
    this.handleOwnerSubmit = this.handleOwnerSubmit.bind(this);
  }

  handleNext() {
    const {stepIndex} = this.state;
    if (this.state.stepIndex === 1 && this.state.owner) {
      this.handleOwnerSubmit();
    }
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  }

  handlePrev() {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1
      });
    }
  }


  handleEntriesChanged(valueType, value) {
    console.log('**inside of handleEntries with type ', valueType, ' ', value);
    this.setState({
      [valueType]: value
    }, () => {
      console.log(this.state[valueType]);
    });
  }


  updateUserType(type) {
    console.log('the type is ', type);
    this.setState({ //initially set the owner and the walker to be false.
      owner: false,
      walker: false
    }, () => {
      console.log('set owner and walker to ', this.state.owner, this.state.walker);
      (type === 'Owner' ? this.setState({owner: true}) : this.setState({walker: true}));
    });
  }

  handleOwnerSubmit() {
    console.log("**SIDE OF SIGNUP PARENT - OWNER SUBMIT");
    console.log("**DOG NAME ", this.state.dogName);
    console.log("**DOG BREED ", this.state.dogBreed);
    console.log("**DOG ABOUT ME ", this.state.dogAboutMe);
    console.log("**PHONE NUMBER ", this.state.phone);
    console.log("**ADDRESS ", this.state.address);
    //if (checkEmptyEntry(this.state.dogName)) { // fix later
      //console.log(this.state);
      //alert('please complete profile');
  //  } else {
    //  console.log(this.state);
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
        console.log('data sent ', data);
      },
      error: function(err) {
        console.log('error sending data to db ', err);
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
        />
      );
    case 1:
      if (this.state.owner) {
        return (
          <OwnerRegister
            phoneInfo = {this.state.phone}
            address = {this.state.address}
            handleOwnerSubmit = {this.handleOwnerSubmit}
            entriesChanged = {this.handleEntriesChanged}
            dogAge = {this.state.dogAge}
            dogWeight = {this.state.dogWeight}
            dogPicURL = {this.state.dogPicURL}
          />
        );
      } else if (this.state.walker) {
        return (
          <WalkerRegister
            phoneInfo = {this.state.phone}
            address = {this.state.address}
            entriesChanged = {this.handleEntriesChanged}
          />);
      }
    default:
      return (
        <div>
          <Payment />
        </div>
      );
    }
  }





  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <MuiThemeProvider>
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>Select an owner or walker account</StepLabel>
            </Step>
            <Step>
              <StepLabel>Complete your profile</StepLabel>
            </Step>
            <Step>
              <StepLabel>Setup Payment</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <p>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                  }}
                >
                Click here
                </a> to reset the example.
              </p>
            ) : (
              <div>
                <div>{this.getStepContent(stepIndex)}</div>
                <div style={{marginTop: 12}}>
                  <FlatButton
                    label="Back"
                    disabled={stepIndex === 0}
                    onClick={this.handlePrev.bind(this)}
                    style={{marginRight: 12}}
                  />
                  <RaisedButton
                    label={stepIndex === 2 ? 'Finish' : 'Next'}
                    primary={true}
                    onClick={this.handleNext.bind(this)}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default SignUpStart;
