import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'


const Useritem = ({user : {login, avatar_url, html_url}}) => {    

        const styling = {
            width : '60px',
        }
        
        return (
            <div className="card text-center">
                <img src={avatar_url} 
                    alt="" 
                    className="round-img" 
                    style={styling} 
                />
                <h3>{login}</h3>

                <div>
                    <a href={html_url}
                        className="btn btn-dark btn-sm my-1">
                            More
                    </a>
                    <Link to={`/user/${login}`}
                        className="btn btn-success btn-sm my-1">
                            Detail
                    </Link>
                </div>
            </div>
        )
}

Useritem.protTypes = {
    user : PropTypes.object.isRequired,
}

export default Useritem
