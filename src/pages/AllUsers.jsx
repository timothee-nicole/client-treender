import React, { useEffect } from 'react'
import apihandler from '../api/apihandler'

const AllUsers = () => {
    const [allUsers, setAllUsers] = React.useState(true) 
    const [loading, setLoading] = React.useState(true)

    useEffect(() => {
        if (loading) {
            apihandler
                .getAllUsers()
                .then(data => {
                    setAllUsers(elem => data)
                    setLoading(elem => !loading)
                })
        }
    }, [allUsers])

    console.log(allUsers);
    return (
        <div>
            
        </div>
    )
}

export default AllUsers
