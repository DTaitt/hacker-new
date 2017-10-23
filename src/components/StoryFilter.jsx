// @flow
import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';


type Props = {
    handleStoryFilter(storyType:string): string,
};

type State = {
    value: string,
};

export default class StoryFilter extends Component<Props, State> {

    state = {
        value: "top",
    }

    handleChange = this.handleChange.bind(this);

    componentDidMount() {
        this.props.handleStoryFilter(this.state.value);
    }
    
    handleChange(e:any) {
        this.props.handleStoryFilter(e.target.value) 
    }

    render() {
        return(
            <FormGroup controlId="story-filter">
                <ControlLabel>Pick your stories</ControlLabel>
                <FormControl 
                    componentClass="select" 
                    onChange = { this.handleChange }
                >
                    <option value = "top">Top Stories</option>
                    <option value = "new">New Stories</option>
                    <option value = "best">Best Stories</option>
                </FormControl>
            </FormGroup>
        )
    }
}