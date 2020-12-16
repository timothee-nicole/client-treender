import React from 'react'
import RangeSlider from './RangeSlider'

const treeArr = ["Nordmann", "Epicea", "Nobilis", "Pungens", "Omorika"]
const filteredTreeArr = []

 const ProductFilter = (props) => {

    function handleChange(e) {
        const valueOneTree = e.target.checked ? e.target.value : e.target.value
        if (valueOneTree) {
            if (!filteredTreeArr.includes(valueOneTree)) {
            filteredTreeArr.push(valueOneTree)
            } else if (filteredTreeArr.includes(valueOneTree)) {
               let i = filteredTreeArr.indexOf(valueOneTree)
               filteredTreeArr.splice(i, 1)
            }
            
        } 
        
        // console.log(filteredTreeArr)
        props.onFilter('type', filteredTreeArr)
    }



    return (
        <div>
            <RangeSlider name={"price"} min={0} max={300} rangeMin={0} rangeMax={300} onFilter={props.onFilter}/>
            <RangeSlider name={"height"} min={0} max={350} rangeMin={0} rangeMax={250} onFilter={props.onFilter}/>
            <form>

            {treeArr.map((elem, i) => (
                <div>
                    <label htmlFor={elem}>{elem}</label><br/>
                    <input type="checkbox" id={elem} name={elem} value={elem} onChange={handleChange} />
                </div>
            ))}
            </form>
        </div>
    )
}

export default  ProductFilter