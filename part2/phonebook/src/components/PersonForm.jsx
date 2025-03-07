const PersonForm = ({ handleSubmit, newName, newPhoneNumber, setNewName, setNewPhoneNumber}) => {
    return (
        <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" value={newName} onChange={(event)=>setNewName(event.target.value)}/>
        </div>
        <div>
          number: <input type="tel" value={newPhoneNumber} onChange={(event)=>setNewPhoneNumber(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm