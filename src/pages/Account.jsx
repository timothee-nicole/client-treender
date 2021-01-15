import React from 'react'
import FormUser from '../components/auth/FormUser'
import FormSignin from '../components/auth/FormSignin'

const Account = () => {
    const [isSignedUp, setIsSignedUp] = React.useState(true)

    function handleIsSignedUp() {
        console.log(isSignedUp);
        setIsSignedUp(elem => !elem);
        console.log(isSignedUp);

    }
    console.log(isSignedUp)
    return (
        <>
        {isSignedUp ? 
        <FormSignin handleForm={handleIsSignedUp} /> 
        : 
        <FormUser action="create" handleForm={handleIsSignedUp}/>}
        </>
    )
}

export default Account
