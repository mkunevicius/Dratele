
import { browserHistory } from 'react-router';


// data fetch helper
export function getFetchConfig(body, method) {
  let config
  if (body) {
    config = {
    headers: {
      'Content-Type' : 'application/json'
    },
    method: method,
    body: JSON.stringify(body)
    }
  } else {
    config = {
    headers: {
      'Content-Type' : 'application/json'
    },
    method: method
    }
  }
  return config
}

export function getProtectedFetchConfig(body, method) {

  let token = localStorage.getItem('token') || null

  if(!token) {
    browserHistory.push('/login')
  }

  let config
  if (body) {
    config = {
      headers: {
        'Content-Type' : 'application/json',
        'x-access-token': token
      },
      method: method,
      body: JSON.stringify(body)
    }
  } else {
    config = {
      headers: {
        'Content-Type' : 'application/json',
        'x-access-token': token
      },
      method: method
    }
  }
  return config
}


// image upload helper
export function imageProtectedFetchConfig(body, method) {
  
  let token = localStorage.getItem('token') || null
  if(!token) {
    browserHistory.push('/login')
  }
  
  let config ={
      headers: {
        'x-access-token': token
      },
      method: method,
      body: body
  }
   
  return config

}

