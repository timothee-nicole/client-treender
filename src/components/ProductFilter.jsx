import React from 'react'
import RangeSlider from './RangeSlider'

 const ProductFilter = () => {

    function handleChange(e) {
        console.log(e.target.checked)
        const value = e.target.checked ? e.target.value : ''
        console.log(value)
    }
    return (
        <div>
            <RangeSlider name={"Price"} min={0} max={300} rangeMin={0} rangeMax={300} />
            <RangeSlider name={"Height"} min={0} max={250} rangeMin={0} rangeMax={250} />
            <form>
                <div>
                    <label htmlFor="Nordmann">Nordmann </label>
                    <input type="checkbox" id="Nordmann" name="Nordmann" value="Nordmann" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="Epicea">Epicea </label>
                    <input type="checkbox" id="Epicea" name="Epicea" value="Epicea" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="Nobilis">Nobilis </label>
                    <input type="checkbox" id="Nobilis" name="Nobilis" value="Nobilis" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="Omorika">Omorika </label>
                    <input type="checkbox" id="Omorika" name="Omorika" value="Omorika" onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="Pungens">Pungens </label>
                    <input type="checkbox" id="Pungens" name="Pungens" value="Pungens" onChange={handleChange} />
                </div>
            </form>
        </div>
    )
}

export default  ProductFilter