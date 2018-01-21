import React, { Component } from 'react'

type Props = {
    url: string,
    title: string,
    by: string,
    score: number,
    time: string,
}

export default class Story extends Component<Props, State> {

    // addToFavorites = { this.props.addToFavorites }
    

    render() {
        //console.log(this.props)
        return(
            <div className = 'story'>
                <div className = 'story-info'>
                    <a target = '_blank' href = { this.props.url }><h2>{ this.props.title }</h2></a>
                    <p>Submitted by { this.props.by }</p>
                    <p>Time: { this.props.time }</p>
                    <p>Score: { this.props.score }</p>       
                </div>    
                <div className = 'interaction'>
                    <span 
                        className = 'glyphicon glyphicon-heart'
                        onClick = { 
                            () => { this.props.addToFavorites({
                                by: this.props.by,
                                id: this.props.id, 
                                score: this.props.score,
                                time: this.props.time,
                                title: this.props.title,
                                url: this.props.url,
                            }) } 
                        }
                    ></span>
                    {/* <span className = 'glyphicon glyphicon-share'></span> */}
                </div>
            </div>
        )    
    }
}