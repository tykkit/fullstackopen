import { addAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from "react-redux"
import { addAnecdoteNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
    dispatch(addAnecdoteNotification(anecdote))
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={add}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
    </div>
  )
}

export default AnecdoteForm