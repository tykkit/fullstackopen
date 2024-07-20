import { useState } from 'react'

const getRandomAnecdote = (anecdotes) => {
  return Math.floor(Math.random() * anecdotes.length)
}

const giveVote = (votes, selected) => {
  const copy = [...votes]
  copy[selected] += 1
  return copy
}

const getMostVoted = (votes) => {
  let highest = Math.max(...votes)
  return votes.indexOf(highest)
}

const Title = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const MostVoted = ({anecdotes, votes}) => {
  return (
    <div>
      <p>{anecdotes[getMostVoted(votes)]}</p>
      <p>has {votes[getMostVoted(votes)]} votes</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => {
  return (
      <button onClick={handleClick}>{text}</button>
  )
}

const Display = ({votes, selected}) => {
  return (
    <div>
      <p>has {votes[selected]} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <div>
      <Title text="Anecdote of the day" />
      {anecdotes[selected]}
      <Display votes={votes} selected={anecdotes.indexOf(anecdotes[selected])} />
      </div>
      <div>
        <Button handleClick={() => setSelected(getRandomAnecdote(anecdotes))} text="next anecdote" />
        <Button handleClick={() => setVotes(giveVote(votes, anecdotes.indexOf(anecdotes[selected])))} text="vote" />
      </div>
      <Title text="Anecdote with most votes" />
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App