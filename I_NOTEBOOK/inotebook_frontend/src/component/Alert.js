import React from 'react'

function Alert(props) {
    console.log(props.message)
    return (
        props.message && <div className={` position-absolute alert alert-${props.message.type} alert-dismissible fade show`} role="alert">
        <strong>{props.message.type}</strong>: {props.message.msg}
         
     </div>

    )
}

export default Alert
