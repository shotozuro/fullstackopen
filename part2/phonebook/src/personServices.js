import axios from 'axios'

const BASE_URL = '/api/persons'

const getAll = async () => {
  const response = await axios.get(BASE_URL)
  return response.data
}

const add = async newPerson => {
  const response = await axios.post(BASE_URL, newPerson)
  return response.data
}

const remove = async personId => {
  const response = await axios.delete(`${BASE_URL}/${personId}`)
  return response.data
}

const update = async (personId, updatedData) => {
  const response = await axios.put(`${BASE_URL}/${personId}`, updatedData)
  return response.data
}

export default { getAll, add, remove, update }
