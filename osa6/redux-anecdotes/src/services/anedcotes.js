import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}

const addVote = async (object) => {
  const id = object.id
  const modifiedObject = {
    ...object,
    votes: object.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, modifiedObject)
  return response.data
}

export default { addVote, createNew, getAll }