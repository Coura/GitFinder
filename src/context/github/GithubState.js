import React, {useReducer} from 'react'
import axios from 'axios'
import GithubContext from './githubContext'
import GithubReducer from './githubReducer'
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS,
    LOAD_FIRST
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !=='production') {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} 
else {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState = {
        users : [],
        user: {},
        repos: [],
        loading:false,
    }

    const [state, dispatch] = useReducer(GithubReducer,initialState);

    //load initial users
    const loadFirst = async () => { 
      
       setLoading();

      const rui = {
        id: '1212',
        login:'Coura',
        avatar_url : 'https://avatars2.githubusercontent.com/u/9034171?s=460&u=d660bf696abbff5fc9210eda2efdb1c6468dad56&v=4',
        html_url : "https://github.com/Coura"
        }

      const res = await axios.get(`https://api.github.com/users?client_id=${githubClientId}&client_secret=${githubClientSecret}`)
      
      res.data.unshift(rui)
      
      dispatch({
        type:LOAD_FIRST,
        payload:res.data
      }) 
    }

    //search Users prop recovery function
    const searchUsers = async (text) => {
    setLoading();
    
    const res =  await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${
        githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({
        type:SEARCH_USERS,
        payload:res.data.items
    })
/*     setUsers(res.data.items);
    setAlert(null); */
  }

  
    //Get user
    const getUser = async (username) => {
        setLoading();
        
        const res =  await axios.get(`https://api.github.com/users/${username}?client_id=${
          githubClientId}&client_secret=${githubClientSecret}`);
    
        dispatch({
            type:GET_USER,
            payload:res.data
        })
      }

    //Get Repos
    const getUserRepos = async (username) => {
        setLoading();
        
        const res =  await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
          githubClientId}&client_secret=${githubClientSecret}`);
    
          dispatch({
              type:GET_REPOS,
              payload:res.data
          })
        /* setRepos(res.data);
        setLoading(false);
        setAlert(null); */
    
      }

    //Clear Users
  const clearUsers = () => dispatch({type:CLEAR_USERS})
  
    //Set Loading
    const setLoading = () => {
        dispatch({type: SET_LOADING});
    }

    return {
                  users:state.users,
            user:state.user,
            repos:state.repos,
            loading:state.loading,
            loadFirst,
            searchUsers,
            clearUsers,
            getUser,
            getUserRepos,
    }

        
        
        
}

const GithubProvider = (children) => {
  return <GithubContext.Provider value={GithubState()} {...children} />
}

export default GithubProvider