import React, { Component } from 'react';

import Story from './Story';

type Props = {
    title: string,
    by: string,
    score: number,
    time: string,
    url: string,
}

type State = {}

export default class StoryContainer extends Component<Props, State> {
    render() {
        // console.log(this.props.addToFavorites)
        return(
            <Story
                id = { this.props.id }
                title = { this.props.title } 
                by = { this.props.by } 
                score = { this.props.score }
                time = { this.props.time }
                url = { this.props.url } 
                addToFavorites = { this.props.addToFavorites }
            />
        )
    }
}