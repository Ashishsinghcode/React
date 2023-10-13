import React from 'react'
import Notes from './Notes'
// import AddNote from './AddNote'
function Home(props) {
    const {handleAlert}=props
    return (
        <>  
            <Notes handleAlert={handleAlert} />
        </>
    )
}

export default Home
