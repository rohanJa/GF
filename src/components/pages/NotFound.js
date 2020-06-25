import React from 'react'
import notFoundImage from './404.png'

const NotFound = () => {
    return (
        <div>
            <img 
                src={notFoundImage} 
                alt="Page Not Found"
                style={{width: '200px',margin: 'auto',display:'block'}} 
            />
            <br></br>
            <br></br>
            <center>
                <h1>Page Not found</h1>
            </center>
        </div>
    )
}

export default NotFound;