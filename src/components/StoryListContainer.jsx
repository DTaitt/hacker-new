import React, { Component } from 'react';

import StoryList from './StoryList';



class StoryListContainer extends Component {
        
    state = {
        topStories: [],
        //isTopStoriesLoaded: false,
    }
    

    componentDidMount() {
        this.fetchTopStories();
    }

    fetchTopStories() {
        fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
            .then(res => {
                return res.json()
            })
            .then(jsonRes => {
                //console.log(jsonRes)
                jsonRes.forEach(id => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                        .then((storyRes) => {
                            return storyRes.json()
                        })
                        .then(storyJson => {
                            //console.log(storyJson)
                            this.setState((prevState) => ({
                                topStories: [...prevState.topStories, storyJson]
                            }))
                        })
                })
            })
    }
    
    render() {
        
        return(
            
            <StoryList topStories = { this.state.topStories } />      
        );
    }
}

export default StoryListContainer;