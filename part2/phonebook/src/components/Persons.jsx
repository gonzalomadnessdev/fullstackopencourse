const Persons = ({ persons , handleDelete}) => {
    return (
        <>
            {(persons.length)
                ? persons.map((p) => <div key={p.id}>{p.name} {p.number} <button onClick={() => handleDelete(p.id)}>delete</button></div>)
                : <div>No results</div>
            }
        </>
    )
}

export default Persons