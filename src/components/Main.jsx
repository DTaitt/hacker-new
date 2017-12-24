import { Switch, Route } from 'react-router-dom'
import React, { Component } from 'react'

// import Home from './pages/Home';
import StoryFilter from './StoryFilter';
import StoryListContainer from './StoryListContainer';
import Search from './Search';

export default class Main extends Component {

    state = {
        favStories: [],
        storyType: "top",
        searchQuery: '',
    }

    handleStoryFilter = this.handleStoryFilter.bind(this);
    handleSearch = this.handleSearch.bind(this)
    addToFavorites = this.addToFavorites.bind(this);

    handleStoryFilter(storyType) {
        this.setState({
            storyType: storyType,
        })
    }

    handleSearch(searchQuery) {
        this.setState({
            searchQuery: searchQuery,
        })
    }

    addToFavorites(favStory) {
        if(this.state.favStories.indexOf(favStory) === -1) {
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
        //console.log(this.state.favStories)
        //console.log(this.state.searchQuery)
        return(
            <main>
                <Search handleSearch = { this.handleSearch } />
                <Switch>
                    <Route exact path='/' render = {(props) => (
                        <div>
                            <StoryFilter handleStoryFilter = { this.handleStoryFilter } />
                            <StoryListContainer storyType = { this.state.storyType } addToFavorites = { this.addToFavorites } searchQuery = { this.state.searchQuery } />
                        </div>
                    )} />
                    <Route path='/favorites' render = {(props) => (
                        <div>
                        <StoryListContainer storyType = "fav" favStories = { this.state.favStories } />
                    </div>
                    )}/>
                </Switch>
            </main>
        )
    }
}
