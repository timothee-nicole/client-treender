import React, {useEffect} from 'react'
import  ProductCard  from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import apiHandler from '../api/apihandler'

const Products = () => {
    const [trees, setTrees] = React.useState(null)

    console.log(trees)
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


    return (
        <>
        <ProductFilter />
        <div style={{display: 'flex', flexWrap:"wrap"}}> 
            {trees && trees.map((obj, i) => {
                return <ProductCard tree={obj} key={i} />
            })}
            
        </div>
        </>
    )
}

export default Products
