import React, { Fragment, Component } from 'react'
import Spinner from './../layouts/Spinner'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Repos from './../repos/Repos'

class User extends Component {

    componentDidMount(){
        this.props.getUser(this.props.match.params.login)
        this.props.getUserRepos(this.props.match.params.login)
    }

    static propTypes = {
        loading:PropTypes.bool,
        getUser:PropTypes.func.isRequired,
        user:PropTypes.object.isRequired,
        getUserRepos:PropTypes.func.isRequired,
        repos:PropTypes.array.isRequired
    }

    render() {
        const {
            avatar_url,
            location,
            site_admin,
            url,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = this.props.user;

        const {loading, repos} = this.props;

        if (loading) return <Spinner/>

        return (
            <Fragment>
                <Link to='/' className='btn btn-light'>Back to Search</Link>
            
                Hireable: {' '} 
                {hireable ? 
                (<i className="fas fa-check text-success" />)
                : 
                (<i className="fas fa-times-circle text-danger"/>)
                }

                <div className="card grid-2">
                    <div className="all-center">
                        <img 
                        src={avatar_url}
                        className='round-img'
                        alt=''
                        style={{ width:'150px' }}                      
                        ></img>
                        <h1>{login}</h1>
                        <p>Location: {location}</p>
                    </div>
                    <div>
                        {url && <Fragment>
                            <h3>URL: </h3>
                            <p>{url}</p>
                        </Fragment>}
                        <a href={html_url} className="btn btn-dark my-1"> Visit Github Profile</a>

                        <ul>
                            <li>
                                {login && <Fragment>
                                    <strong>Username: {login}</strong>
                                    </Fragment>}
                            </li>
                            <li>
                                {site_admin && <Fragment>
                                    <strong>Site Admin: {site_admin}</strong>
                                    </Fragment>}
                            </li>

                        </ul>
                    </div>
                </div>
                <div className='card text-center'>
                    <div className="badge badge-primary">Followers: {followers}</div> 
                    <div className="badge badge-success">Following: {following}</div>  
                    <div className="badge badge-light">Public Repos: {public_repos}</div>  
                    <div className="badge badge-dark">Public Gists: {public_gists}</div>    
                </div>
                <Repos repos={repos}/>
            </Fragment>
        )

    }
}

export default User
