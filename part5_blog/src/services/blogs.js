import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl, { headers : { Authorization : token } })
  return response.data
}

const create = async blogObj => {
  const response = await axios.post(baseUrl, blogObj,{ headers : { Authorization : token } })
  return response.data
}

const update = async (id, blogObj) => {
  const response = await axios.put(baseUrl + `/${id}`, blogObj,{ headers : { Authorization : token } })
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(baseUrl + `/${id}`, { headers : { Authorization : token } })
  return response.data
}

export default { getAll , setToken, create, update, remove }