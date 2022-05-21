import React from 'react';

const Alert = ({message}) => {
    return (
        <div className="notification is-danger is-light">{ message }</div>
    )
}

export { Alert }
