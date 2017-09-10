import React from 'react';
import { arrayOf, object } from 'prop-types';

import StoryContainer from './StoryContainer';

StoryList.propTypes = {
    topStories: arrayOf(object),
}

export default function StoryList(props) {
    return(
        <section className = "story-list">
            {   
                props.topStories.slice(5, 10).map((story) => {
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