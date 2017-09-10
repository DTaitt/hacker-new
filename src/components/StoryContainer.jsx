import React, { Component } from 'react';

import Story from './Story';

class StoryContainer extends Component {
    render() {
        return(
            <Story
                title = { this.props.title } 
                by = { this.props.by } 
                score = { this.props.score }
                time = { this.props.time }
                url = { this.props.url } 
            />
        )
    }
}

export default StoryContainer;