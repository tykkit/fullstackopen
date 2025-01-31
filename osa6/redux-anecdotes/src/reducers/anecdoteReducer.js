import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anedcotes'

//const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state,action) {
      const id = action.payload.id
      return state.map(anecdote => 
        anecdote.id === id ? action.payload : anecdote
      )
    },
    sortAnecdotes(state) {
      return state.sort((a,b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, addVote, setAnecdotes, sortAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
    dispatch(sortAnecdotes())
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const increaseVote = anecdote => {
  return async dispatch => {
    const modifiedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch(addVote(modifiedAnecdote))
    dispatch(sortAnecdotes())
  }
}

export default anecdoteSlice.reducer