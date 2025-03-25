import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl, { headers : { Authorization : token }})
  return request.then(response => response.data)
}

const create = async blogObj => {
  const response = await axios.post(baseUrl, blogObj,{ headers : { Authorization : token }})
  return response.data
}

const update = async (id, blogObj) => {
  const response = await axios.put(baseUrl + `/${id}`, blogObj,{ headers : { Authorization : token }})
  return response.data
}

export default { getAll , setToken, create, update }