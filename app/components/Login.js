import React, {Component, PropTypes} from 'react'

class Login extends Component {

  render() {
    return (

      <div>
        <h1>This is {this.props.route.header}</h1>
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
