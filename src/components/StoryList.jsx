// @flow
import React from 'react';

import StoryContainer from './StoryContainer';

type Props = {
    stories: Object[],
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

export default function StoryList({stories, addToFavorites}) {
    // console.log(stories)
    // console.log(addToFavorites)
    return(
        <section className = "story-list">
            {   
                stories.map((story: story) => {
                    return (<StoryContainer 
                        key = { story.id }
                        id = { story.id }
                        title = { story.title } 
                        by = { story.by } 
                        score = { story.score }
                        time = { story.time }
                        url = { story.url } 
                        addToFavorites = { addToFavorites }
                    />)
                })
            }
        </section>
    )
}