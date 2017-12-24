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
        //stops app from trying to fetch 'favorite stories' from Hacker News API
        if (this.props.storyType !== 'fav') {
            this.fetchStories(this.props.storyType)
        }       
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.storyType !== nextProps.storyType) {
            this.fetchStories(nextProps.storyType)
        }
    }

    fetchStories = this.fetchStories.bind(this);
    // addToFavorites = this.addToFavorites.bind(this);

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
                    }), () => {
                        console.log(storyJson.title.split(' '))
                    }) 
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

    // addToFavorites(favStory) {
    //     if(this.state.favStories.indexOf(favStory) === -1) {
    //         this.setState((prevState) => ({
    //             favStories: [...prevState.favStories, favStory]
    //         }))
    //     }        
    // }
    
    render() {
        // console.log(this.props.storyType)
        // console.log(this.addToFavorites)
        // console.log(this.state.favStories)
        // this.fetchStories(this.props.storyType)
        //console.log(this.state.topStories)

        let filteredStoryList = null;
        // switch(this.props.storyType) {
        //     case 'top':
        //         filteredStoryList = <StoryList stories = { this.state.topStories } addToFavorites = { this.props.addToFavorites } searchQuery = { this.props.searchQuery } />
        //         break;
        //     case 'new':
        //         filteredStoryList = <StoryList stories = { this.state.newStories } addToFavorites = { this.props.addToFavorites } />
        //         break;  
        //     case 'best':
        //         filteredStoryList = <StoryList stories = { this.state.bestStories } addToFavorites = { this.props.addToFavorites } />
        //         break;  
        //     case 'fav':
        //         filteredStoryList = <StoryList stories = { this.props.favStories } addToFavorites = { this.props.addToFavorites } />
        //         break;  
        //     default:
        //         filteredStoryList = <StoryList stories = { this.state.topStories } addToFavorites = { this.props.addToFavorites } />          
        // }

        let stories = null;

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

        // console.log(this.props.searchQuery)

        // function queryFilter(story) {
        //     let titleArr = story.title.split(' ');
        //     if (titleArr.indexOf(this.props.searchQuery) !== -1) {
        //         return story;
        //     }
        // }

        console.log(stories)
        console.log(this.props.searchQuery)
        if (this.props.searchQuery !== '') {
            stories = stories.filter(
                (story) => {
                    console.log(story.title.split())
                    return story.title.toLowerCase().split(' ').indexOf(this.props.searchQuery) !== -1
                }
            )
        }
        console.log(stories)
        

        return(
            <div>
                {/* { filteredStoryList } */}
                <StoryList stories = { stories } addToFavorites = { this.props.addToFavorites } />
            </div>     
        );
    }
}