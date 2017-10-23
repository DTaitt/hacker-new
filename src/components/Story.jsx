// @flow
import React from 'react'

type Props = {
    url: string,
    title: string,
    by: string,
    score: number,
    time: string,
}

export default function Story(props: Props) {
    return(
        <div className = 'story'>
            <div className = 'story-info'>
                <a target = '_blank' href = { props.url }><h2>{ props.title }</h2></a>
                <p>Submitted by { props.by }</p>
                <p>Time: { props.time }</p>
                <p>Score: { props.score }</p>       
            </div>    
            <div className = 'interaction'>
                <span className = 'glyphicon glyphicon-heart'></span>
                <span className = 'glyphicon glyphicon-share'></span>
            </div>
        </div>
    )
}