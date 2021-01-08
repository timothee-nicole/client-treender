import React, {useEffect} from 'react'
import apiHandler from '../api/apihandler'
import {withRouter} from 'react-router-dom'

const AllTrees = (props) => {
    const [trees, setTrees] = React.useState(null)


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

    function handleDelete(e) {
        e.preventDefault()
        apiHandler
            .deleteTree(e.target.value)
            .then((data) => {
                setTrees((trees) => {
                    return trees = null
            })})
            .catch((err) => console.log(err))
        
        
    }

    return (
        <div>
        <a href="/create-tree">Create Tree</a>
            {trees ? trees.map((elem, i) => {
                return <div>{elem._id} | {elem.name} | {elem.price} <a href={`/${elem._id}/edit`}>EDIT</a> <button value={elem._id} style={{color: 'red'}} onClick={handleDelete}>DELETE</button> </div>
            }) : 'content is loading'}
        </div>
    )
}


export default withRouter(AllTrees)