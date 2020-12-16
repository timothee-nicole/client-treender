import React from 'react'
import { propTypes } from 'react-bootstrap/esm/Image'
import FormTree from '../components/FormTree'

const EditTree = (props) => {
    return (
        <div>
           <FormTree id={props.match.params.id} action={"edit"} /> 
        </div>
    )
}

export default EditTree
