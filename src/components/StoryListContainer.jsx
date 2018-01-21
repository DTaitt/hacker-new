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
    
    // state: State = {
    //     // storyType: 'top',
    //     topStories: [],
    //     newStories: [],
    //     bestStories: [],
    //     favStories: [],
    // }

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
                switch(storyType) {
                    case 'top':
                        storyJson.id += 't';
                        break;
                    case 'new':
                        storyJson.id += 'n';
                        break;    
                    case 'best':
                        storyJson.id += 'b';
                        break;
                    default:
                        storyJson.id += 't';     
                }
                // console.log(storyJson);
                storyJson.time =  moment.unix(storyJson.time).format("MM.DD.YY HH:mm");
                storyJson.isInFav =  false;
                // console.log(storyJson)
                this.props.handleStoryArrays(storyJson)

            }             
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }  

    render() {
        
        let stories;
        // console.log(this.props.storyType)
        // console.log(this.props.handleStoryArrays)
        // console.log(stories)

        switch(this.props.storyType) {
            case 'top':
                stories = this.props.topStories  
                break;
            case 'new':
                stories = this.props.newStories  
                break;  
            case 'best':
                stories = this.props.bestStories  
                break;  
            case 'fav':
                stories = this.props.favStories  
                break;  
            default:
                stories = this.props.topStories            
        }

        // console.log(stories)

        if (this.props.searchQuery !== '' && stories !== undefined) {
            stories = stories.filter(
                (story: Object) => {
                    // console.log(story.title.split())
                    return story.title.toLowerCase().indexOf(this.props.searchQuery) !== -1
                }
            )
        }

        return(
            <StoryList stories = { stories } addToFavorites = { this.props.addToFavorites } />
        );
    }
}