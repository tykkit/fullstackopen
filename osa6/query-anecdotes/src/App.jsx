import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch } from './NotificationContext'
import axios from 'axios'

const App = () => {
  const queryClient = useQueryClient()
  const baseUrl = 'http://localhost:3001/anecdotes'
  const dispatch = useNotificationDispatch()

  const addVoteMutation = useMutation({
    mutationFn: (mutatedAnecdote) => {
      axios.put(`${baseUrl}/${mutatedAnecdote.id}`, mutatedAnecdote).then(res => res.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    addVoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({ 
      type: 'SET_NOTIFICATION', 
      payload: `anecdote '${anecdote.content}' voted`
    })
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: () => axios.get(baseUrl).then(res => res.data),
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
