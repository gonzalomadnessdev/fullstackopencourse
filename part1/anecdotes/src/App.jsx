import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(() => 0))

  const handleNextAnecdote = () => {
    let rand
    do{
      rand = Math.floor(Math.random() * anecdotes.length);
    }
    while(rand == selected)
    setSelected(rand)
  }

  const handleVoteAnecdote = () => {
    const tempVotes = [... votes]
    ++tempVotes[selected]
    setVotes(tempVotes)

    setMostVoted(findMostVoted(tempVotes))
  }

  const findMostVoted = (votes) => {
    let max = votes[0];
    let index = 0;

    votes.forEach((el, i) => {
      if (el > max) {
        max = el;
        index = i;
      }
    });

    return index;
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {votes[selected]} votes</div>
      <button onClick={handleVoteAnecdote}>vote</button>
      <button onClick={handleNextAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <div>
        {anecdotes[mostVoted]}
      </div>
    </>
  )
}

export default App