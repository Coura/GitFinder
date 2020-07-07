import React, {useContext, useEffect} from 'react'
import UserItem from './Useritem'
import Spinner from '../Layout/Spinner'


import GithubContext from '../../context/github/githubContext'


const Users = () => {
    const githubContext = useContext(GithubContext)
    const {loading, users} = githubContext;

    useEffect( ()=>{
        if(users.length <= 0)
        githubContext.loadFirst();
      },[githubContext,users.length])

    return (
            <>
                {loading ? (<Spinner />) : (<div style={userStyle}>
                {users.map(user => (

                    <UserItem key={user.id} user={user} />

                ))} </div>)}
               
            </>
        )
    }



const userStyle = {
    display : 'grid',
    gridTemplateColumns : 'repeat(3,1fr)',
    gridGap: '1rem'
}

export default Users

