import { useState } from 'react'

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Display = ({text, value}) => {
  return(
    <div>
      <p>{text} {value}</p>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return(
      <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({text, value}) => {
  return(
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good+neutral+bad === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return(
      <table>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'total'} value={good + neutral + bad} />
        <StatisticLine text={'average'} value={(good - bad) / (good + neutral + bad)} />
        <StatisticLine text={'positive'} value={(good / (good + neutral + bad)) * 100 + ' %'} />
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={'give feedback'} />
      <div>
        <Button onClick={() => setGood(good + 1)} text={'good'} />
        <Button onClick={() => setNeutral(neutral + 1)} text={'neutral'} />
        <Button onClick={() => setBad(bad + 1)} text={'bad'} />
      </div>
      <Header text={'statistics'} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App