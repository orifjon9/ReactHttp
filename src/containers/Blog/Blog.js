import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import './Blog.css';

class Blog extends Component {

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink
                                to="/posts"
                                activeClassName="active"
                                activeStyle={{
                                    color: 'orange',
                                    textDecoration: 'underline'
                                }}
                            >Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?query=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/posts" exact render={() => <Posts />} />
                    <Route path="/new-post" exact component={NewPost} />
                    <Redirect from="/" exact to="/posts" />
                    <Route component={()=><h1>Not found</h1>} />
                    
                </Switch>
            </div>
        );
    }
}

export default Blog;