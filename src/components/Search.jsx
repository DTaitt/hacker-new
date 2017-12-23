import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export default class Search extends Component {
    
    state = {
        value: '',
    }

    handleChange = this.handleChange.bind(this);

    handleChange(e) {
        this.setState({
            value: e.target.value,
        })
    }
    
    render() {
        console.log(this.state.value)
        return (
            <form>
                <FormGroup>
                    <ControlLabel></ControlLabel>
                    <FormControl
                        type = 'text'
                        value = { this.state.value }
                        placeholder = 'Search'
                        onChange = { this.handleChange }    
                    />
                    <FormControl.Feedback />
                </FormGroup>    
            </form> 
        )
    }
}