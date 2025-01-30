import { useSelector, useDispatch } from 'react-redux'
import { addVote, sortAnecdotes } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => {
        if (state.filter) {
            const filter = state.filter[0]
            return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))  
        } else {
            return state.anecdotes
        }
    })

    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
        dispatch(sortAnecdotes())
        const voted = anecdotes.find(a => a.id === id)
        dispatch(voteNotification(voted.content))
    }  

    return (
        <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
              <div>
                {anecdote.content}
              </div>
              <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote.id)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList