// @flow
import React, { Component } from 'react';
import moment from 'moment';

import StoryList from './StoryList';
import StoryFilter from './StoryFilter';

// topStories prop doesn't hold type
//may not need filterValue state. should rerender when storyfilter state.value changes
//move handleStoryFilter from componentDidMount

type Props = {
    topStories: Object[],
};

type State = {
    topStories: Object[],
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
        topStories: [],
    }

    componentDidMount() {
        this.fetchStories();
    }

    // handleStoryFilter(storyType) {
    //     console.log(storyType)
    //     switch(storyType) {
    //         case 'top':
    //             this.fetchStories('top');
    //             break;
    //     }
    // }

    async fetchStories(storyType = 'top') {
        try {
            let res = await fetch(`https://hacker-news.firebaseio.com/v0/${storyType}stories.json?print=pretty`);
            let storyIDs = await res.json();  
            //console.log(storyIDs); 
            for (let id of storyIDs) {
                let storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`);
                let storyJson = await storyRes.json();
                //console.log(storyJson);
                storyJson.time =  moment.unix(storyJson.time).format("MM.DD.YY HH:mm");
                this.setState((prevState) => ({
                    topStories: [...prevState.topStories, storyJson]
                }))    
            }        
        }
        catch (err) {
            console.log(`Error: ${err.stack}`);
        }
    }
    
    render() {
        return(
            <div>
                {/* <StoryFilter 
                    handleStoryFilter = { this.handleStoryFilter } 
                    fetchStories = { this.fetchStories } 
                />  */}
                <StoryList 
                    topStories = { this.state.topStories }
                />
            </div>     
        );
    }
}