const Filter = ({filterValue, handleFilterChange, resetFilter}) => {
    return (
        <div>
            Find countries by name<br/>
            <input value = {filterValue} onChange = {handleFilterChange}></input>
            <button onClick={() => resetFilter()}>Reset</button>
        </div>
    )
}

export default Filter