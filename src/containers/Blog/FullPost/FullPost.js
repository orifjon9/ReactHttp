import React, { Component } from 'react';
import axios from '../../../axios';

import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    };

    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        this.id = +this.props.match.params.id;
        if (this.id) {
            if (this.state.loadedPost == null || (this.state.loadedPost && this.state.loadedPost.id !== this.id)) {
                axios.get('/posts/' + this.id)
                    .then(response => {
                        this.setState({ loadedPost: response.data });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }
        }
    }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.id)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    render() {
        let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;

        if (this.id) {
            post = <p style={{ textAlign: "center" }}>Loading!</p>;
        }

        if (this.id && this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button
                            className="Delete"
                            onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;