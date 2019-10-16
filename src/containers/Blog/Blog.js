import React, { Component } from 'react';
import axios from '../../axios';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null
    };

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Orifjon'
                    };
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
            });
    }

    selectedPostHandler = (id) => {
        this.setState({ selectedPostId: id });
    };

    render() {
        const postsHTML = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.selectedPostHandler(post.id)} />;
        }).slice(0, 3);

        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/new-post">New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                    {postsHTML}
                </section>
            </div>
        );
    }
}

export default Blog;