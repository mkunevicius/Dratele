import React, { Component } from 'react'

class Login extends Component {

  render() {
    return (

      <div className='login'>
        <h1>{this.props.route.header}</h1>
        <form>
          <input type="text" name="username" placeholder="Username"></input>
          <input type="password" name="password" placeholder="Password"></input>
          <button type="submit">Login</button>
        </form>
      </div>

    )
  }

}

export default Login
