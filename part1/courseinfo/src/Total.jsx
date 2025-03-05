const Total = (props) => {
    const exercises = props.exercises
    return(
        <p>Number of exercises {exercises.reduce((acc, curr) => acc + curr, 0)}</p>
    )
}

export default Total