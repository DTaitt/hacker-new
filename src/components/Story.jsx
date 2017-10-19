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
        <div className = "story">
            <a href = { props.url }><h2>{ props.title }</h2></a>
            <p>Submitted by { props.by }</p>
            <p>Score: { props.score }</p>
            <p>Time: { props.time }</p>
        </div>
    )
}