import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner'
import Repo from '../repos/Repos'
import Repos from '../repos/Repos';
export class User extends Component {
    
    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        user: PropTypes.object.isRequired,
        repos: PropTypes.array.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
    }

    render() {
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
        } = this.props.user; 

        const { loading, repos }  = this.props;

        if(loading) return <Spinner />

        return (
            <Fragment>
                <Link to='/' class='btn btn-light'>
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

                <div className='card text-center'>
                    <div className='badge badge-primary'>Followers: {followers}</div>
                    <div className='badge badge-success'>Following: {following}</div>
                    <div className='badge badge-danger'>Public Repos: {public_repos}</div>
                    <div className='badge badge-dark'>Public Gists: {public_gists}</div>
                </div>
                <Repos repos={repos}/>
            </Fragment>
        )
    }
}

export default User;
