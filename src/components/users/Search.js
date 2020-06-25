import React, { useState, useContext } from 'react'
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';
import AlertState from '../../context/alert/AlertState';

const Search = () => {
    const githubContext = useContext(GithubContext);
    const alertContext = useContext(AlertContext); // calling alertContext to use alert Context
    
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value)                 //e.target name is used beacause if we want onChange function 
    }                                                 

    const onSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            alertContext.setAlert('Please enter something','light');
        }
        else{
            githubContext.searchUsers(text);
            setText('');
        }
    }

    return (
        <div>
            <form className='form' onSubmit={onSubmit}>
                <input type="text" 
                        name="text" 
                        placeholder="Search Users...."
                        value={text}
                        onChange={(e)=>onChange(e)}
                />
                <input type="submit" 
                        value="Search"
                        className="btn btn-dark btn-block"
                />
            </form>

            {/* if their is no user the clear button will not appear as thier is no user to clear*/}
            {githubContext.users.length > 0 && (
                                                <button 
                                                    className='btn btn-light btn-block'
                                                    onClick={githubContext.clearUsers}
                                                >
                                                    Clear
                                                </button>
                                                )
            }
        </div>
    )
}

export default Search
