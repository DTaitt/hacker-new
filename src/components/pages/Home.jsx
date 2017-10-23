import React, { Component } from 'react';
import StoryFilter from './../StoryFilter';
import StoryListContainer from './../StoryListContainer';

export default class Home extends Component {

    state = {
        storyType: 'top',
    }

    handleStoryFilter = this.handleStoryFilter.bind(this);

    handleStoryFilter(storyType) {
        this.setState({
            storyType: storyType,
        })
    }

    render() {
        return(
            <div>
                <StoryFilter handleStoryFilter = { this.handleStoryFilter } />
                <StoryListContainer storyType = { this.state.storyType } />
            </div>
        )
    }
}