import React, { Component } from 'react';
import moment from 'moment';

import StoryList from './StoryList';
import StoryFilter from './StoryFilter';

class StoryListContainer extends Component {
        
    state = {
        topStories: [],
        newStories: [],
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
                            storyJson.time =  moment.unix(storyJson.time).format("MM.DD.YY HH:mm")
                            this.setState((prevState) => ({
                                topStories: [...prevState.topStories, storyJson]
                            }))
                        })
                })
            })
    }
    
    render() {
        
        return(
            <div>
            <StoryFilter />
            <StoryList topStories = { this.state.topStories } /> 
            </div>     
        );
    }
}

export default StoryListContainer;