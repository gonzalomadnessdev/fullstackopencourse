const Filter = ({ collection, property, setter, label }) => {
    const handleFilter = (event) => {
        if (event.target.value == '') {
            setter(collection)
            return
        }
        const tempFilteredCollection = collection.filter(p => p[property].toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()))
        setter(tempFilteredCollection)
    }

    return (
        <div>
            {label}: <input type="text" onChange={handleFilter} />
        </div>
    )
}

export default Filter