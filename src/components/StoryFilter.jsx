import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class StoryFilter extends Component {

      state = {
          value: "top",
      }

      handleChange = this.handleChange.bind(this);
      handleSubmit = this.handleSubmit.bind(this);
    
      handleChange(e) {
        this.setState({value: e.target.value});
      }
    
      handleSubmit(e) {
        alert('Your favorite flavor is: ' + this.state.value);
        e.preventDefault();
      }

    render() {
        return(
            // <FormGroup controlId = "formControlsSelect" onSubmit = { this.handleSubmit }>
            //     <ControlLabel>Pick your stories</ControlLabel>
            //     <FormControl value = { this.state.value } onChange = { this.handleChange }>
            //         <option value = "top">Top Stories</option>
            //         <option value = "new">New Stories</option>
            //         <option value = "best">Best Stories</option>
            //     </FormControl>
            // </FormGroup>
            <FormGroup controlId="formControlsSelect" onSubmit = { this.handleSubmit }>
                <ControlLabel>Pick your stories</ControlLabel>
                <FormControl componentClass="select" onChange = { this.handleChange }>
                    <option value = "top">Top Stories</option>
                    <option value = "new">New Stories</option>
                    <option value = "best">Best Stories</option>
                </FormControl>
            </FormGroup>
        )
    }
}