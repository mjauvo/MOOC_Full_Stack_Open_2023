const Filter = ({filterValue, handleFilterChange}) => {
    return (
        <div>
            Find countries by name<br/>
            <input value = {filterValue} onChange = {handleFilterChange}></input>
        </div>
    )
}

export default Filter