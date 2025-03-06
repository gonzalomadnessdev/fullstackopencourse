const Part = (prop) => {
    const name = prop.name
    const exercises = prop.exercises

    return (<p>{name} {exercises}</p>)
}

export default Part