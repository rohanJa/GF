import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

const GithubState = props => {
    const intialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, intialState);

    //Search Users
  
        //to get text from search to parent app through invoking function of parent by passing props to child
        const searchUsers = async (text) => {

            setLoading()

            const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
        
            dispatch({
                type: SEARCH_USERS,
                payload: res.data.items
            });
        }

    //Get User

        //Get details of single github users
        const getUser = async (username) => {

            setLoading();
            //the below API gets the specific username details which has to be rendered in the User Component 
            const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

            dispatch({
                type: GET_USER,                 // as this is get request data is in "res.data" not in
                payload: res.data               // "res.data.items" as it return object of single users
                  
            })
                            
        }
    //Get Repos
    
        //get users repos
        const getUserRepos = async (username) => {
            setLoading();
            
            // below API give list of 5 recent github repo recently created by the user 
            const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
            
            dispatch({
                type: GET_REPOS,
                payload: res.data
            });              // as this is get request data is in "res.data" not in
                             // "res.data.items" as it return object of single users 
        }
        
    //Clear Users
        
        //clear user from state
        const clearUsers = () =>{
            dispatch({
                type: CLEAR_USERS
            });    
        }
    //Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <GithubContext.Provider
                value={{
                    users: state.users,
                    user: state.user,
                    repos: state.repos,
                    loading: state.loading,
                    searchUsers,
                    clearUsers,
                    getUser,
                    getUserRepos
                }}
           >
            {props.children}
           </GithubContext.Provider>
}

export default GithubState;