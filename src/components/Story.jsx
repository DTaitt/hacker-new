import React from 'react'

export default function Story(props) {
    return(
        <div className = "story">
            <a href = { props.url }><h2>{ props.title }</h2></a>
            <p>Submitted by { props.by }</p>
            <p>Score: { props.score }</p>
            <p>Time: { props.time }</p>
        </div>
    )
}