import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Search extends Component {

    state = {
        text: ''
    }
    
    //SETTING PROP TYPE
    static propTypes = {
        searchUsers: PropTypes.func.isRequired,
        clearUsers: PropTypes.func.isRequired,
        showClear: PropTypes.bool.isRequired,
        setAlert: PropTypes.func.isRequired,
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value                 //e.target name is used beacause if we want onChange function 
        })                                                  //for email change we have to create another function so due to this we can access
                                                            // the name of particular input without creating different onChange function by.
    }                                                      //using name attribute assigned to the corresponding input

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.text === '' ){
            this.props.setAlert('Please enter something','light');
        }
        else{
            this.props.searchUsers(this.state.text);
            this.setState({ text: '' });
        }
    }

    render() {

        const { showClear, clearUsers } = this.props

        return (
            <div>
                <form className='form' onSubmit={this.onSubmit}>
                    <input type="text" 
                            name="text" 
                            placeholder="Search Users...."
                            value={this.state.text}
                            onChange={(e)=>this.onChange(e)}
                    />
                    <input type="submit" 
                            value="Search"
                            className="btn btn-dark btn-block"
                    />
                </form>
            {/* if their is no user it will not show the clear button */}

                {showClear && <button className='btn btn-light btn-block' onClick={clearUsers}>Clear</button>}
            </div>
        )
    }
}

export default Search
