// @flow
import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react'

import StoryFilter from './StoryFilter';
import StoryListContainer from './StoryListContainer';
import Search from './Search';

type State = {
    favStories: Object[],
    searchQuery: string,
    storyType: string,
};

export default class Main extends Component<void, State> {
    
    state: State = {
        topStories: [],
        newStories: [],
        bestStories: [],
        favStories: [],
        favStoryIDs: [],
        searchQuery: '',
        storyType: 'top'
    }

    handleSearch = this.handleSearch.bind(this)
    handleStoryFilter = this.handleStoryFilter.bind(this);
    handleStoryArrays = this.handleStoryArrays.bind(this);
    addToFavorites = this.addToFavorites.bind(this);

    handleSearch(searchQuery: string) {
        this.setState({
            searchQuery: searchQuery,
        })
    }

    handleStoryFilter(storyType: string) {
        this.setState(({
            storyType: storyType,
        }))
    }

    handleStoryArrays(storyArr) {
        if(this.state.storyType === 'top' && this.state.topStories.length < 60) {
            this.setState((prevState) => ({
                topStories: [...prevState.topStories, storyArr]
            }))
        } else if(this.state.storyType === 'new' && this.state.newStories.length < 60) {
            this.setState((prevState) => ({
                newStories: [...prevState.newStories, storyArr]
            }))
        } else if(this.state.storyType === 'best' && this.state.bestStories.length < 60) {
            this.setState((prevState) => ({
                bestStories: [...prevState.bestStories, storyArr]
            }))
        }
    }

    addToFavorites(newFavStory: Object) {              
        if (this.state.favStoryIDs.indexOf(newFavStory.id) === -1) {
            this.setState((prevState) => ({
                favStories: [...prevState.favStories, newFavStory],
                favStoryIDs: [...prevState.favStoryIDs, newFavStory.id],
            })
            // ,() => {
            //     console.log(this.state.favStoryIDs);
            //     console.log(newFavStory.id)
            //     console.log(this.state.favStories)
            //     console.log(this.state.favStoryIDs.indexOf(newFavStory.id))
            // }
        )
        } else {
            this.setState((prevState) => ({
                favStories: prevState.favStories.filter((favStory) => {
                    return favStory.id !== newFavStory.id;
                }),
                favStoryIDs: prevState.favStoryIDs.filter((favStoryID) => {
                    return favStoryID !== newFavStory.id;
                })
            })
            // ,() => {
            //     console.log(this.state.favStoryIDs);
            //     console.log(newFavStory.id)
            //     console.log(this.state.favStories)
            //     console.log(this.state.favStoryIDs.indexOf(newFavStory.id))
            // }
        )         
        }
    }

    render() {
        //console.log(this.state)
        let home = (props) => (
            <div>
                <StoryFilter
                    handleStoryFilter={this.handleStoryFilter}
                />
                <StoryListContainer
                    storyType={this.state.storyType}
                    topStories={this.state.topStories}
                    newStories={this.state.newStories}
                    bestStories={this.state.bestStories}
                    addToFavorites={this.addToFavorites}
                    searchQuery={this.state.searchQuery}
                    handleStoryArrays={this.handleStoryArrays}
                />
            </div>
        )

        let favorites = (props) => (
            <div>
                <StoryListContainer
                    storyType='fav'
                    addToFavorites={this.addToFavorites}
                    searchQuery={this.state.searchQuery}
                    favStories={this.state.favStories}
                />
            </div>
        )

        return (
            <main>
                <Search
                    handleSearch={this.handleSearch}
                />
                <Switch>
                    <Route
                        exact path='/'
                        render={home}
                    />
                    <Route
                        exact path='/favorites'
                        render={favorites}
                    />
                </Switch>
            </main>
        )
    }
}
