import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async modifiedObject => {
  const config = {
    headers: { Authorization: token }
  }

  const targetUrl = `${baseUrl}/${modifiedObject.id}`

  const response = await axios.put(targetUrl, modifiedObject, config)

  return response.data
}

const remove = async idToRemove => {
  const config = {
    headers: { Authorization: token }
  }

  const targetUrl = `${baseUrl}/${idToRemove}`

  const response = await axios.delete(targetUrl, config)

  return response.data
}

export default { getAll, create, put, remove, setToken }