const Filter = ({ handleFilter, value, label }) => {
    return (
        <div>
            {label}: <input type="text" onChange={handleFilter} value={value} />
        </div>
    )
}

export default Filter