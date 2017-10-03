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
    
    // handleStoryFilter = this.handleStoryFilter.bind(this);
    // fetchStories = this.fetchStories.bind(this);

    componentDidMount() {
        this.fetchStories();
    }

    // handleStoryFilter(fValue) {
    //     console.log(`${fValue} is what handleStoryFilter sees`);
        
    //     this.setState({
    //         filterValue: fValue,
    //     }, () => {
    //         console.log(`${this.state.filterValue} is the filterValue state`)
    //     })
        
    //     switch(fValue) {
    //         case 'new':
    //             this.fetchStories('new');
    //             break;
    //         default:
    //             this.fetchStories('top')
    //     }
    // }

    fetchStories() {
        fetch(`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`)
            .then(res => {
                return res.json()
            })
            .then(jsonRes => {
                //console.log(jsonRes)
                jsonRes.forEach((id: number) => {
                    fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
                        .then((storyRes) => {
                            return storyRes.json()
                        })
                        .then((storyJson: storyJson) => {
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
                {/*<StoryFilter handleStoryFilter = { this.handleStoryFilter } fetchStories = { this.fetchStories } /> */}
                <StoryList 
                    topStories = { this.state.topStories }
                />
            </div>     
        );
    }
}