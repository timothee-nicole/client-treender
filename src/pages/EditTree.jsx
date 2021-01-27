import React from 'react'
import FormTree from '../components/FormTree'

// Page through which we will render the CREATE form component

const EditTree = (props) => {
    return (
        <div>
           <FormTree id={props.match.params.id} action={"edit"} /> 
        </div>
    )
}

export default EditTree
