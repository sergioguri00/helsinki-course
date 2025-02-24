import { useState } from 'react'

const Header = () => {
  return <h1>give feedback</h1>
}

const Button = ({ text, handleClick }) => {
  return <button onClick={handleClick}>{text}</button>
}

const StatisticsHeader = () => {
  return <h1>statistics</h1>
}

const Statistics = (props) => {
  if (props.all === 0) {
    return <p>No feedback given</p>
  }
  return (
    <>
      <StatisticLine text='good' value={props.good} />
      <StatisticLine text='neutral' value={props.neutral} />
      <StatisticLine text='bad' value={props.bad} />
      <StatisticLine text='all' value={props.all} />
      <StatisticLine text='average' value={props.average} />
      <StatisticLine text='positive' value={props.positive + '%'} />
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return <p>{text} {value}</p>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const handleGood = () => {
    const newGood = good + 1
    setGood(newGood)
    calculateStatistics({ newGood })
  }

  const handleNeutral = () => {
    const newNeutral = neutral + 1
    setNeutral(newNeutral)
    calculateStatistics({ newNeutral })
  }

  const handleBad = () => {
    const newBad = bad + 1
    setBad(newBad)
    calculateStatistics({ newBad })
  }

  const calculateStatistics = ({ newGood, newNeutral, newBad }) => {
    const newAll = all + 1
    setAll(newAll)
    let newAverage = average
    let newPositive = good / newAll
    if (newGood) {
      newAverage = (newGood*1 + bad*-1) / newAll
      newPositive = (newGood / newAll)
    } else if (newNeutral) {
      newAverage = (good*1 + bad*-1) / newAll
    } else if (newBad) {
      newAverage = (good*1 + newBad*-1) / newAll
    }
    setAverage(newAverage)
    setPositive(newPositive * 100)
  }

  return (
    <div>
      <Header />
      <Button text='good' handleClick={handleGood} />
      <Button text='neutral' handleClick={handleNeutral} />
      <Button text='bad' handleClick={handleBad} />
      <StatisticsHeader />
      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} positive={positive}/>
    </div>
  )
}

export default App