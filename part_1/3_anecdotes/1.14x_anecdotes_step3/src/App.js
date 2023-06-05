import { useState } from 'react'

const randomize = (number) => (
    Math.floor(Math.random() * number)
)

const Title = ({title}) => (
    <h1>{title}</h1>
)

const Button = ({handleClick, label}) => (
    <button onClick = {handleClick}>{label}</button>
)

const Anecdote = ({selected, votes}) => (
    <>
        <p>
            <em>{selected}</em><br/><br/>
            VOTES: {votes}
        </p>
    </>
)

const Winner = ({winner, maxVotes}) => (
    <>
        <p>
            <strong><em>{winner}</em><br/><br/>
            VOTES: {maxVotes}:</strong>
        </p>
    </>
)

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

    const handleSelect = () => setSelected(
        randomize(anecdotes.length),
    )
    //console.log('Selected: ', selected)

    const handleVote = () => {
        const vote = [...votes]
        vote[selected] += 1
        setVotes(vote)
    }
    //console.log('Selected votes: ', votes[selected])

    let maxVotes = 0
    let maxVotesIndex = 0

    for (let i = 0; i < anecdotes.length; i++) {
        if (votes[i] > maxVotes) {
            maxVotes = votes[i]
            maxVotesIndex = i
        }
    }
    //console.log('Winning: ', maxVotesIndex)

    return (
        <div>
            <Title title = "Anecdote of the Day" />
            <Button handleClick = {handleSelect} label = "NEXT ANECDOTE" /> 
            <Button handleClick = {handleVote}   label = "VOTE" />
            <Anecdote selected = {anecdotes[selected]} votes = {votes[selected]}/>
            <Title title = "Anecdote with most votes" />
            <Winner winner={anecdotes[maxVotesIndex]} maxVotes={maxVotes} />
        </div>
    )
}

export default App