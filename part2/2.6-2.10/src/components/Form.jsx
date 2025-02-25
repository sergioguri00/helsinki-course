const Form = ({ newName, handleChangeName, newNumber, handleChangeNumber, handleClick }) => {
    return (
    <>
    <form>
        <div>
            name: <input value={newName} onChange={handleChangeName}/>
        </div>
        <div>number: <input value={newNumber} onChange={handleChangeNumber}/></div>
        <div>
            <button type="submit" onClick={handleClick}>add</button>
        </div>
    </form>
    </>
    )
}

export default Form