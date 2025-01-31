import { useSelector, useDispatch } from 'react-redux'
import { increaseVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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

    const vote = async (anecdote) => {
        console.log('vote', anecdote)
        dispatch(increaseVote(anecdote))
        dispatch(setNotification(`you voted ${anecdote.content}`, 5))
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
                <button onClick={() => vote(anecdote)}>vote</button>
              </div>
            </div>
          )}
        </div>
    )
}

export default AnecdoteList