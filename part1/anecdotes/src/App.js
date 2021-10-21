import React, { useState } from 'react'

const Button = ({clickHandler, text}) => {
  return (
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}

const Anecdote = ({anecdote}) => <div>{anecdote}</div>

const VotesLine = ({votes}) => <div>has {votes} votes</div>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(7).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length+1)))
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    if(copy[selected] > copy[mostVotes]) {
      setMostVotes(selected)
    }
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdote={anecdotes[selected]} />
        <VotesLine votes={votes[selected]} />
        <Button clickHandler={vote} text="Vote" />
        <Button clickHandler={randomAnecdote} text="Next anecdote" />
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdote={anecdotes[mostVotes]} />
        <VotesLine votes={votes[mostVotes]} />
      </div>
    </div>
  )
}

export default App