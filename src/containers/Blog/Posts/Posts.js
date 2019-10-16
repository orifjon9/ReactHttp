import React, { Component } from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
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

        return <section className="Posts">
            {postsHTML}
        </section>
    }
}

export default Posts;