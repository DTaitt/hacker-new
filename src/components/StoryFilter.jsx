import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class StoryFilter extends Component {

    state = {
        value: "top",
    }

    // handleChange = this.handleChange.bind(this);

    //   componentDidMount() {
    //     this.props.handleStoryFilter(this.state.value);
    //   }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.value !== this.state.value;
    }
    
    // handleChange(e) {
    //     this.setState({
    //         value: e.target.value
    //     }, () => { this.props.handleStoryFilter(this.state.value); });
    // }

    render() {
        return(
            <FormGroup controlId="formControlsSelect">
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