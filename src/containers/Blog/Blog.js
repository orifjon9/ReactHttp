import React, { Component, Suspense } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import asyncComponent from '../../hoc/asyncComponent';

import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost');
});

const Posts = React.lazy(() => import('./Posts/Posts'));

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
                    <Route path="/posts" render={() => 
                        <Suspense fallback={() => <div>Loading...</div>}>
                            <Posts />
                        </Suspense>
                    } />
                    <Route path="/new-post" exact component={AsyncNewPost} />
                    <Redirect from="/" exact to="/posts" />
                    <Route component={()=><h1>Not found</h1>} />
                    
                </Switch>
            </div>
        );
    }
}

export default Blog;