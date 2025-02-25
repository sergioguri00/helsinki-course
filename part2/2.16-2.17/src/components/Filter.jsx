const Filter = ({ filter, handleChangeFilter }) => {
    return (
    <div>
          filter shown with <input value={filter} onChange={handleChangeFilter}/>
    </div>
    )
}

export default Filter