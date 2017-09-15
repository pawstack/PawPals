import React from 'react';
import ReactDOM from 'react-dom';
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
      owner: false,
      walker: true,
      phone: '',
      address: ''
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleEntriesChanged = this.handleEntriesChanged.bind(this);
    this.updateUserType = this.updateUserType.bind(this);
    this.getStepContent = this.getStepContent.bind(this);
  }

  handleNext() {
    const {stepIndex} = this.state;
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
    this.setState({
      [valueType]: value
    }, () => {
      console.log(this.state[valueType]);
    });
  }


  updateUserType(e) {
    this.setState({ //initially set the owner and the walker to be false.
      owner: false,
      walker: false
    }, () => {
      (e.state.owner ? this.setState({owner: true}) : this.setState({walker: true}));
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
            addressInfo = {this.state.address}
          />
        );
      } else if (this.state.walker) {
        return (
          <WalkerRegister
            phoneInfo = {this.state.phone}
            addressInfo = {this.state.address}
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
              <StepLabel>Fill out your info as a owner or a walker</StepLabel>
            </Step>
            <Step>
              <StepLabel>Complete profile</StepLabel>
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
