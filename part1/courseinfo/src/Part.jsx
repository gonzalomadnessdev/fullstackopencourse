const Part = (prop) => {
    const part = prop.part
    const exercises = prop.exercises

    return (<p>{part} {exercises}</p>)
}

export default Part