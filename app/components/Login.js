import React, { Component } from 'react'
import { getFetchConfig } from '../utils/helperFunctions'
import { hashHistory, browserHistory } from 'react-router';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: ''
    }
  }

  render() {
    return (
      
      <div className='login'>
        <h1>{this.props.route.header}</h1>
        <div>
          <input
            className='field'
            type="text"
            value={this.state.username}
            placeholder="Username"
            onChange={(e) => {this.setState({ username: e.target.value})}}>
          </input>
          <input
            className='field'
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={(e) => {this.setState({ password: e.target.value})}}>
          </input>
          <button className='button' onClick={() => {this.onLogin()}}>Login</button>
        </div>
      </div>

    )
  }

  onLogin() {
    fetch('/api/login', getFetchConfig(this.state, 'POST'))
    .then((response) => {
      if (!response.ok) return Promise.reject(response.statusText)
      return response.json()
    })
    .then(data => {
      console.log(data)
      if (data.result === 'OK') {
        browserHistory.push('/admin')
      } else {

      }
    })
  }

}

export default Login
