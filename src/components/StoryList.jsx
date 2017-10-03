// @flow
import React from 'react';

import StoryContainer from './StoryContainer';

type Props = {
    topStories: Object[],
}

type story = {
    by: string,
    descendants: number,
    id: number, 
    kids: Number[],
    score: number,
    time: string,
    title: string,
    type: string,
    url: string,
}

export default function StoryList(props: Props) {
    return(
        <section className = "story-list">
            {   
                props.topStories.slice(5, 10).map((story: story) => {
                    return (<StoryContainer 
                        key = { story.id }
                        title = { story.title } 
                        by = { story.by } 
                        score = { story.score }
                        time = { story.time }
                        url = { story.url }  
                    />)
                })
            }
        </section>
    )
}