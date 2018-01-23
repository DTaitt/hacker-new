# Hacker New

## About Hacker New

Hacker New is a recreation of the Hacker News site written in React using the Hacker News API. Users are able to use a filter to go the type of stories (top stories, new stories and best stories) that they want to see. Users are also able to search for stories and favorite stories that they like or might want to read later. Hacker New can be found on Heroku [here](https://dry-journey-22288.herokuapp.com/).

## Installation Instructions

1. Fork and clone this repository
2. Run `npm install` in the root directory
3. Go to `localhost:3000` and enjoy!

## Technologies/Tools/Techniques Used

- React
- React Boostrap
- React Router
- Hacker News API
- SASS(SCSS)
- Moment.js
- Presentational/Container Components
- Responsive Design
- Accessible Design
- ES6+ (classes, spread operator, async/await, etc)

## Thoughts

This project had a few firsts for me. I had decided that I wanted to implement some "best practices" that I had heard about for React. I started using presentation and container (i.e. smart and dumb) components and also started using functional components. 

I also started using some newer ES features that I hadn't tried out yet. The big one for me was finally using async/await since I had heard so many good things about it. It took me a while but I finally got it to work which was great. I also had to use a "for...of" loop for the first time to get my call to work, so it was a double whammy for me.

## Next Steps

I started implementing Flow into this project but I haven't finished yet. It's definitely been a struggle but it forces me to be more considerate of the JavaScript that I'm writing. I also need to write my tests for this. In the future, I'm going to start writing my tests first instead.

**Hacker New Version** **_2.0_**

I'm going to remake this in the future but I'm going to build it out in Typescript. I'm also going to use Redux to handle the state. I also want to build out a backend for it so that when a user saves a story as a favorite, it can be stored there instead of as state. I also want to add user auth on the backend. I haven't decided yet what backend I want to use. I'm leaning towards Express or Rails since I've used those before but I *really* want to try out Django.