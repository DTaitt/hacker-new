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
        favStories: [],
        searchQuery: '',
        storyType: 'top'
    }

    handleSearch = this.handleSearch.bind(this)
    handleStoryFilter = this.handleStoryFilter.bind(this);
    addToFavorites = this.addToFavorites.bind(this);

    handleSearch(searchQuery: string) {
        this.setState({
            searchQuery: searchQuery,
        })
    }

    handleStoryFilter(storyType: string) {
        this.setState({
            storyType: storyType,
        })
    }

    addToFavorites(favStory: Object) {
        if (this.state.favStories.indexOf(favStory) === -1) {
            this.setState((prevState) => ({
                favStories: [...prevState.favStories, favStory]
            }))
        } else {
            this.setState((prevState) => ({
                favStories: prevState.favStories.filter((story) => {
                    return story !== favStory;
                })
            }))
        }
    }

    render() {
        let home = (props) => (
            <div>
                <StoryFilter
                    handleStoryFilter={this.handleStoryFilter}
                />
                <StoryListContainer
                    storyType={this.state.storyType}
                    addToFavorites={this.addToFavorites}
                    searchQuery={this.state.searchQuery}
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
