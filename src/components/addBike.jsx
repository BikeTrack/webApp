import React, { Component } from 'react';
import { read_cookie } from 'sfcookies';
import { browserHistory } from 'react-router';

import '../img/App.css';
import { API_KEY, BASE_URL } from '../constants'
import AppNavbar from './AppNavbar';
import fra from '../lang/fr'
import eng from '../lang/en'
import ita from '../lang/it-IT';

let activeLang;
let lang = read_cookie('lang');
if (lang === "FR") {
  activeLang = fra;
} else if (lang === "IT") {
  activeLang = ita;
} else {
  activeLang = eng;
}

class addBike extends Component {

  constructor(props){
    super(props);
    this.state = {
      apiKey: API_KEY,
      name: '',
      brand: '',
      mail: '',
      id: '',
      created: '',
      updated: '',
      bikes: '',
      bName: '',
      tracker: '',
      error: {
        message: ''
      }
    }
  }

  addBike() {
    if (this.state.name && this.state.tracker) {
      const { name, brand, tracker } = this.state;
      let userId = read_cookie('userId');
      let JWTToken = read_cookie('token');
      let request = new XMLHttpRequest();
      let FETCH_URL = BASE_URL + "bike";
      let success = false;

      console.log('Token', JWTToken);
      console.log('usrId', userId);

      request.open('POST', FETCH_URL);
      request.setRequestHeader('Content-Type', 'application/json');
      request.setRequestHeader('Authorization', this.state.apiKey);
      request.setRequestHeader('x-access-token', JWTToken);
      request.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
          // DEBUGGING
          // console.log('Status:', this.status);
          // console.log('Headers:', this.getAllResponseHeaders());
          // console.log('Body:', this.responseText);
          browserHistory.push('/addSuccess');
        } else if (this.readyState === 4 && this.status !== 200){
          browserHistory.push('/failure');
        }
      };
      let body = {
        'userId': userId,
        'bikeInfo': {
          'name': name,
          'brand': brand,
          'tracker': tracker
          // 'tracker': "7462C"
        }
      };
      request.send(JSON.stringify(body));
    }
  }

  render() {
    return (
      <div className="App bgGen bgBike">
        <AppNavbar />
        <div className="form-inline" style={{margin: '5px'}}>
          <div className="bgSpacer"></div>
          <h2 className="App-intro">{activeLang.appAdd}</h2>
          <div className="gen-box">
            <div className="log-box">
              <input
                className="form-control"
                type="text"
                style={{marginRight: '7px'}}
                placeholder="name"
                required
                onChange={event => this.setState({name: event.target.value})}
              /><br/><br/>
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="brand"
                onChange={event => this.setState({brand: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.addBike()
                  }
                }}
              /><br/><br/>
              <input
                className="form-control"
                style={{marginRight: '5px'}}
                placeholder="TrackerID"
                required
                onChange={event => this.setState({tracker: event.target.value})}
                onKeyPress={event => {
                  if (event.key === "Enter") {
                  this.addBike()
                  }
                }}
              />
              {/* <input type="file" /> */}
            <br/>
            </div>
            <button
              className="SignButton"
              onClick={() => this.addBike()}
              >
                {activeLang.buttAddBike}
            </button>
            <div>{this.state.error.message}</div>
          </div><br/><br/>
        </div>
      </div>
    )
  }
}

export default addBike;
