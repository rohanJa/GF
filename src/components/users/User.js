import React, { useEffect, Fragment, useContext } from 'react'
import { Link } from 'react-router-dom';

import GithubContext from '../../context/github/githubContext';

import Spinner from '../layout/Spinner'
import Repo from '../repos/Repos'
import Repos from '../repos/Repos';
import GithubState from '../../context/github/GithubState';

const User = ({ match }) => {
    
    const githubContext = useContext(GithubContext);
    const { getUserRepos, getUser, loading, user, repos } = githubContext;
    
    useEffect(() => {
        getUser(match.params.login);                
        getUserRepos(match.params.login);
        //eslint-disable-next-line
    }, []);

    /*
        As useEffect hook work similar to componenDidMount lifecycle method.
        But useEffect is making continuos request to make it run like componentDidMount 
        we passed an empty array as second argument in useEffect.   
                                Or 
        To run it like componentDidUpdate we pass argument on who's change the 
        useEffect should run.
        Call the 'getUser()' mehtod - which gets the user information.
        Call the 'getUserRepos()' mehtod - which gets the user repository.
    */

    const {
        name,
        avatar_url,
        location,
        bio,
        blog,
        login,
        html_url,
        company,
        followers,
        following,
        public_repos,
        public_gists,
        hireable
    } = user; 

    if(loading) return <Spinner />   /*
                                        If still loading the Spinner component will appear as loading is true otherwise 
                                        the User component which contains information about the user will appear.        
                                     */              
    return (
        <Fragment>
            <Link to='/' className='btn btn-light'>
                Back To Search
            </Link>
            Hireable :{' '}
            {
                hireable ? <i className="fa fa-check text-success"/>
                            : <i className="fa fa-times-circle text-danger"/>
            }

            <div className="card grid-2">
                {/* 
                    Below div tag is used to show the image and location
                    of the user.
                */}
                <div className="all-center">
                    <img 
                        src={avatar_url}
                        className="round-img"
                        alt='' 
                        style={{width:'150px'}} 
                    />
                    <h1>{name}</h1>
                    <p>Location: {location}</p>
                </div>

                {/* 
                    Below div tag is used to show the bio of the user
                    if avaialable
                */}
                
                <div>
                    {bio && (<Fragment>                 {/* this && shows when bio is avialabel it will show the fragment otherwise it will not render the fragment  */}
                                <h3>Bio</h3>
                                <p>{bio}</p>
                            </Fragment>
                    )}
                    <a href={html_url} className="btn btn-dark my-1" target="_blank">   {/* target blank is done because it will open*/ }
                        Visit Github Profile                                            {/* the github profile in the new tab and we will be able to maintain the state */}  
                    </a>

                    <ul>

                        <li>
                            {login && <Fragment>
                                        <strong>Username: </strong>{login}
                                      </Fragment>
                            }
                        </li>

                        <li>
                            {company && <Fragment>
                                            <strong>Company: </strong>{company}
                                        </Fragment>
                            }
                        </li>

                        <li>
                            {blog && <Fragment>
                                        <strong>Website: </strong><a href={blog} target="_blank">{blog}</a>
                                     </Fragment>
                            }
                        </li>
                    
                    </ul>
                </div>

            </div>
        
                {/* Basic information about the user. */}
            <div className='card text-center'>
                <div className='badge badge-primary'>Followers: {followers}</div>
                <div className='badge badge-success'>Following: {following}</div>
                <div className='badge badge-danger'>Public Repos: {public_repos}</div>
                <div className='badge badge-dark'>Public Gists: {public_gists}</div>
            </div>

            <Repos repos={repos}/>   {/* It will display the five recent repository of the corresponding user.*/}
        
        </Fragment>
    )
    
}

export default User;