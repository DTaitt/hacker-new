// @flow
import React, { Component } from 'react';
import moment from 'moment';

import StoryList from './StoryList';

type Props = {
    storyType: string,
    addToFavorites(favStory: Object): Object[],
    searchQuery: string,
    favStories?: Object[],
};

type State = {
    // storyType: string,
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
    
    props: Props
    
    state: State = {
        // storyType: 'top',
        topStories: [],
        newStories: [],
        bestStories: [],
        favStories: [],
    }

    componentDidMount() {
        //stops app from trying to fetch 'favorite stories' from Hacker News API
        if (this.props.storyType !== 'fav') {
            this.fetchStories()
        }       
    }

    componentWillReceiveProps(nextProps: any) {
        if(this.props.storyType !== nextProps.storyType) {
            this.fetchStories(nextProps.storyType)
        }
    }

    fetchStories = this.fetchStories.bind(this);
    // addToFavorites = this.addToFavorites.bind(this);

    async fetchStories(storyType: string = 'top') {
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
        
        let stories = this.state.topStories;

        switch(this.props.storyType) {
            case 'top':
                stories = this.state.topStories  
                break;
            case 'new':
                stories = this.state.newStories  
                break;  
            case 'best':
                stories = this.state.bestStories  
                break;  
            case 'fav':
                stories = this.props.favStories  
                break;  
            default:
                stories = this.state.topStories            
        }

        if (this.props.searchQuery !== '' && stories !== undefined) {
            stories = stories.filter(
                (story: Object) => {
                    console.log(story.title.split())
                    return story.title.toLowerCase().split(' ').indexOf(this.props.searchQuery) !== -1
                }
            )
        }

        return(
            <StoryList stories = { stories } addToFavorites = { this.props.addToFavorites } />
        );
    }
}