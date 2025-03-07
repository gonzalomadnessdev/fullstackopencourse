const Persons = ({ persons }) => {
    return (
        <>
        {(persons.length) ? persons.map((p) => <div key={p.id}>{p.name} {p.number}</div>) : <div>No results</div>}
        </>
    )
}

export default Persons