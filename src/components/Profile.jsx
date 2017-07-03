import React, { Component } from 'react';
import { read_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants'
import AppNavbar from './AppNavbar';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      mail:'',
      id:'',
      fname:'',
      lname:'',
      created:'',
      updated:'',
      bikes: '',
      birthday: '',
      error: {
        message: ''
      }
    }
  }

  componentDidMount() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "profile/" + userId;
    let that = this;

    console.log('Token', JWTToken);
    console.log('usrId', userId);

    request.open('GET', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
    request.onreadystatechange = function () {
    if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    if (this.status === 200)  {

      let myObj = JSON.parse(this.response);

      that.setState({
            id: myObj.user._id,
            mail: myObj.user.mail,
            fname: myObj.user.name,
            lname: myObj.user.lastname,
            created: myObj.user.created,
            updated: myObj.user.updated,
            bikes: myObj.user.bikes,
            birthday: myObj.user.dob
          });
      }
    };
    request.send(JSON.stringify());
  }

  deleteUser() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "profile";
    let success = false;

    /*console.log('Token', JWTToken);
    console.log('usrId', userId);*/

    request.open('DELETE', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
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
    let body = {
      'userId': userId,
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/delSuccess');
        } else {
          browserHistory.push('/failure');
        }
      }, 2000)
  }

  editUser() {
    let userId = read_cookie('userId');
    let JWTToken = read_cookie('token');
    let request = new XMLHttpRequest();
    let FETCH_URL = BASE_URL + "profile";
    let success = false;

    request.open('PATCH', FETCH_URL);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Authorization', this.state.apiKey);
    request.setRequestHeader('x-access-token', JWTToken);
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
    let body = {
      'userId': userId,
      'update': {
        mail: this.state.mail,
        name: this.state.fname,
        lastname: this.state.lname,
        dob: this.state.birthday
      }
    };
    request.send(JSON.stringify(body));
    setTimeout(function() {
        if (success) {
          browserHistory.push('/editSuccess');
        } else {
          browserHistory.push('/failure');
        }
      }, 2000)
  }

  render() {
    return (
      <div className="App">
        <AppNavbar />
        <div className="gen-box">
          <div className="form-inline" style={{margin: '5px'}}>
            <h2 className="App-intro">Profile Preview</h2>
            <p className="intro-text">First Name : {this.state.fname}</p>
            <p className="intro-text">Last Name : {this.state.lname}</p>
            <p className="intro-text">Birthday : {this.state.birthday}</p>
            <p className="intro-text">Mail : {this.state.mail}</p>
            <p className="intro-text">Id : {this.state.id}</p>
            <p className="intro-text">Creation : {this.state.created}</p>
            <p className="intro-text">Last Modified : {this.state.updated}</p>
            <div className="form-group">
              <br/><br/><br/>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteUser()}
                >
                  Delete User
              </button>
            </div>
            <br/>
            <div className="form-group">
              <h4 className="intro-text">Modify your profile informations</h4>
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="First Name"
                onChange={event => this.setState({fname: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.editUser()
                  }
                }}
              />
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="Last Name"
                onChange={event => this.setState({lname: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.editUser()
                  }
                }}
              />
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="Birthday"
                onChange={event => this.setState({birthday: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.editUser()
                  }
                }}
              />
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="mail"
                onChange={event => this.setState({mail: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.editUser()
                  }
                }}
              />
            <br/>
              <button
                className="SignButton"
                style={{marginTop: '10px'}}
                onClick={() => this.editUser()}
                >
                  Modify User
              </button>
            </div>

            <div>{this.state.error.message}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
