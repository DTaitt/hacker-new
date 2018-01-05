// @flow
import React from 'react';

import StoryContainer from './StoryContainer';

type Props = {
    stories: Object[],
    addToFavorites(favStory: Object): Object[],
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
                props.stories.map((story: story) => {
                    return (<StoryContainer 
                        key = { story.id }
                        id = { story.id }
                        title = { story.title } 
                        by = { story.by } 
                        score = { story.score }
                        time = { story.time }
                        url = { story.url } 
                        addToFavorites = { props.addToFavorites }
                    />)
                })
            }
        </section>
    )
}