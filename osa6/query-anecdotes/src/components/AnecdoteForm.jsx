import axios from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "../NotificationContext"
import { useEffect } from "react"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: (newAnecdote) => axios.post('http://localhost:3001/anecdotes', newAnecdote).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: () => {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'too short anecdote, must have length 5 or more'
      })
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote:', content)
    newAnecdoteMutation.mutate({ content, votes: 0})
    dispatch({ 
      type: 'SET_NOTIFICATION', 
      payload: `anecdote '${content}' added`
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
