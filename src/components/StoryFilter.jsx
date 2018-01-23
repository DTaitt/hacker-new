// @flow
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


type Props = {
    handleStoryFilter(storyType:string): string,
};

export default class StoryFilter extends Component<Props> {

    props: Props

    componentDidMount() {
        this.props.handleStoryFilter('top') 
    }

    render() {
        return(
            <FormGroup className="story-filter" controlId="story-filter">
                <ControlLabel>Pick your stories</ControlLabel>
                <FormControl 
                    componentClass="select" 
                    onChange = { (e) => { 
                        this.props.handleStoryFilter(e.target.value) 
                    } }
                >
                    <option value = "top">Top Stories</option>
                    <option value = "new">New Stories</option>
                    <option value = "best">Best Stories</option>
                </FormControl>
            </FormGroup>
        )
    }
}