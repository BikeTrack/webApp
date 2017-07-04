import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { read_cookie } from 'sfcookies';
import FacebookLogin from 'react-facebook-login';

import { API_KEY, BASE_URL } from '../constants'
import TopNavbar from './Navbar';
import '../img/App.css';
import fra from '../lang/fr.js'
import eng from '../lang/en.js'

let activeLang;
let lang = read_cookie('lang');
if (lang === "FR") {
  activeLang = fra;
} else {
  activeLang = eng;
}

const responseFacebook = (response) => {
  console.log(response);
}

class SignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      lname: '',
      fname: '',
      birthday: '',
      apiKey: API_KEY,
      error: {
        message: ''
        }
      }
    }

  signUp() {
    const { email, password, lname, fname, birthday} = this.state;
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "signup";
    let success = false;
    request.open('POST', FETCH_URL);

    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
      if (this.status === 200) {
          success = true;
      }
    };
    console.log('this.state.apiKey', this.state.apiKey);
    console.log('this.state.email', this.state.email);
    console.log('this.state.password', this.state.password);

    let body = {
      'mail': email,
      'password': password,
      'lastname': lname,
      'name': fname,
      'dob': birthday,
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/success');
        } else {
          browserHistory.push('/failure');
        }
      }, 3000)
  }

  render() {
    return (
      <div className="App">
        <TopNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <br/><br/><h2 className="App-intro ">{activeLang.signupHead}</h2>
          <div className="gen-box">
            <div className="log-box">
              <input
                className="form-control"
                type="text"
                placeholder="First Name"
                required
                onChange={event => this.setState({lname: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="text"
                placeholder="Last Name"
                required
                onChange={event => this.setState({fname: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="text"
                placeholder="Bithday"
                onChange={event => this.setState({birthday: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="text"
                placeholder="email"
                required
                onChange={event => this.setState({email: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                type="password"
                placeholder="password"
                required
                onChange={event => this.setState({password: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.signUp()
                  }
                }}
              /><br/>
            </div><br/>
            <button
              className="SignButton"
              type="button"
              onClick={() => this.signUp()}
              >
                {activeLang.buttSignup}
            </button>
            <FacebookLogin
              appId="1088597931155576"
              autoLoad={true}
              fields="name,email,picture"
              callback={responseFacebook} />
          </div>
        <div>{this.state.error.message}</div>
        <div type="text" className="center"><Link to={'/signin'}>{activeLang.buttSigninAlt}</Link></div>
      </div>
    </div>
    )
  }
}

export default SignUp;
