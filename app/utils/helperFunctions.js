

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
  console.log(config)
  return config
}
