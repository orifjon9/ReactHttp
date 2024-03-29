import React, { Component } from 'react';
import axios from '../../../axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        body: '',
        author: 'Orifjon',
        submitted: false
    }

    postDataHandler = () => {
        var data = {
            ...this.state
        };

        axios.post('/posts', data)
            .then(response => {
                console.log(response);
                this.setState({ submitted: true });
            });
    };

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to="/posts" />
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
                <label>Content</label>
                <textarea rows="4" value={this.state.body} onChange={(event) => this.setState({ body: event.target.value })} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
                    <option value="Orifjon">Orifjon</option>
                    <option value="Dilnura">Dilnura</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;