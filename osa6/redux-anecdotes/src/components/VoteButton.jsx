import { useDispatch } from "react-redux";
import { addVote, sortAnecdotes } from "../reducers/anecdoteReducer";

const VoteButton = (id) => {
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(sortAnecdotes())
  }

  return (
    <button onClick={() => vote(id)}>vote</button>
  )
}

export default VoteButton