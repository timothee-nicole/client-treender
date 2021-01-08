import React, {useEffect} from 'react'
import  ProductCard  from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import apiHandler from '../api/apihandler'

let treeArrwithFilter = [];
const Products = () => {
    const [trees, setTrees] = React.useState(null)
    const [filteringValues, setFilteringValues] = React.useState({price: [], height: [], type: []})

    // console.log(trees)
    useEffect(() => {
        if (trees === null) {
            apiHandler
                .getAllTrees('/api/tree/all')
                .then((data) => {
                    setTrees( (trees) => {
                        return trees = data
                    })
                })
        }
        return () => { 
        }
    }, [trees])

    function handleValues(key, value) {
        const newFilter = {...filteringValues}
        newFilter[key] = value
        setFilteringValues((filteringValues) => {
            return filteringValues = newFilter
        })
        console.log(filteringValues)
        treeArrwithFilter = trees.filter((obj, j) => {
            if (key === "price" || key === "height"){
                return obj[`${key}`] >= newFilter[`${key}`][0] && obj[`${key}`] <= newFilter[`${key}`][1]
            } else {
                return newFilter[`${key}`].includes(obj[`${key}`])
            }
        })
        console.log(treeArrwithFilter)
    }
    
    return (
        <div className="product-page">
        <ProductFilter onFilter={handleValues} />
        <div style={{display: 'flex', flexWrap:"wrap"}}> 
            {treeArrwithFilter.length ? treeArrwithFilter.map((obj, i) => {
                return <ProductCard tree={obj} key={i} />
            }) : trees ? trees.map((obj, i) => {
                return <ProductCard tree={obj} key={i} />
            }) : <div> Content is loading</div>}
            {}
        </div>
        </div>
    )
}

export default Products
