import React from 'react'
import context from 'react-bootstrap/esm/AccordionContext'
import {UserContext} from './UserContext'

const withUser = (ComponentToPassUserContextTo) => {
    return function (props) {
        return (
            <UserContext.Consumer>
                {(context) => (
                    <ComponentToPassUserContextTo {...props} context={context} />
                )}
            </UserContext.Consumer>
        );
    };
};

export default withUser