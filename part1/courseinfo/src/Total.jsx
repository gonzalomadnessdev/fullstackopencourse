const Total = (props) => {
    const parts = props.parts
    const numberOfExercises = parts.map(p => p.exercises).reduce((acc, curr) => acc + curr, 0)
    return(
        <p>Number of exercises {numberOfExercises}</p>
    )
}

export default Total