// @flow
import React, { Component } from 'react';
import moment from 'moment';

import StoryList from './StoryList';

type Props = {
    stories: Object[],
    newStories: Object[],
};

type State = {
    storyType: string,
    topStories: Object[],
    newStories: Object[],
    bestStories: Object[],
    favStories: Object[],
};

type storyJson = {
    by: string,
    descendants: number,
    id: number, 
    kids: Number[],
    score: number,
    time: string,
    title: string,
    type: string,
    url: string,
}

export default class StoryListContainer extends Component<Props, State> {
        
    state = {
        storyType: 'top',
        topStories: [],
        newStories: [],
        bestStories: [],
        favStories: [],
    }

    componentDidMount() {
        this.fetchStories(this.props.storyType)
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.storyType !== nextProps.storyType) {
            this.fetchStories(nextProps.storyType)
        }
    }

    fetchStories = this.fetchStories.bind(this);

    async fetchStories(storyType) {
        try {
            let res = await fetch(`https://hacker-news.firebaseio.com/v0/${storyType}stories.json?print=pretty`);
            let storyIDs = await res.json();  
            //console.log(storyIDs); 
            for (let id of storyIDs) {
                let storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
                let storyJson:storyJson = await storyRes.json();
                //console.log(storyJson);
                storyJson.time =  moment.unix(storyJson.time).format("MM.DD.YY HH:mm");

                if((storyType === 'top') && (this.state.topStories.length < 10)) {
                    this.setState((prevState) => ({
                        topStories: [...prevState.topStories, storyJson]
                    })) 
                } else if((storyType === 'new') && (this.state.newStories.length < 10)) {
                    this.setState((prevState) => ({
                        newStories: [...prevState.newStories, storyJson]
                    })) 
                } else if((storyType === 'best') && (this.state.bestStories.length < 10)) {
                    this.setState((prevState) => ({
                        bestStories: [...prevState.bestStories, storyJson]
                    })) 
                }
            }             
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }  
    
    render() {
        // console.log(this.props.storyType)
        // console.log(this.state)
        // this.fetchStories(this.props.storyType)

        let storyList = null;
        switch(this.props.storyType) {
            case 'top':
                storyList = <StoryList stories = { this.state.topStories } />
                break;
            case 'new':
                storyList = <StoryList stories = { this.state.newStories } />
                break;  
            case 'best':
                storyList = <StoryList stories = { this.state.bestStories } />
                break;  
            default:
                storyList = <StoryList stories = { this.state.topStories } />          
        }

        return(
            <div>
                { storyList }
            </div>     
        );
    }
}